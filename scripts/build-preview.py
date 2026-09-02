#!/usr/bin/env python3
"""
Bundle the built site into one self-contained HTML file that can be opened in
a browser with nothing installed — the preview link CLAUDE.md asks for before
any visual change is merged.

Every page shares the same 91KB of chrome (the header carries a 600-entry
ticker), so pages are stored split: the handful of distinct chromes once each,
then one <main> per route. That is the difference between a 20MB dump and a
3MB file.

Each route is handed to an iframe as srcdoc rather than swapped into the
parent. Page scripts then run exactly as they do on the real site — once, on
a fresh document — instead of stacking a new set of scroll listeners on every
navigation.
"""
import base64, glob, hashlib, json, mimetypes, os, re, sys

DIST = 'dist'
OUT = sys.argv[1] if len(sys.argv) > 1 else 'preview-site.html'

SKIP = ('preview/', 'how/')          # design studies and the /how redirect stub
TITLE = 'Hyperporter Site Preview'

# ---------------------------------------------------------------- assets ----

def datauri(rel):
    p = os.path.join(DIST, rel.lstrip('/').split('?')[0])
    if not os.path.isfile(p):
        return None
    mt = mimetypes.guess_type(p)[0] or 'application/octet-stream'
    if p.endswith('.woff2'):
        mt = 'font/woff2'
    with open(p, 'rb') as fh:
        return 'data:%s;base64,%s' % (mt, base64.b64encode(fh.read()).decode())

ASSET_RE = re.compile(r'(/[A-Za-z0-9_\-./]+\.(?:jpg|jpeg|png|webp|avif|svg|woff2|ico))')

def inline_assets(text):
    """Swap every local asset reference for a data URI. Missing files are left
    alone: /photos/* is still unlicensed, and the preview should show those
    tiles exactly as the live site does rather than hide the gap."""
    seen = {}
    def sub(m):
        ref = m.group(1)
        if ref not in seen:
            seen[ref] = datauri(ref) or ref
        return seen[ref]
    return ASSET_RE.sub(sub, text)

# ------------------------------------------------------------------ css ----

css_files, css_index = [], {}
for path in sorted(glob.glob(os.path.join(DIST, '_astro', '*.css'))):
    href = '/_astro/' + os.path.basename(path)
    with open(path, encoding='utf-8') as fh:
        css_index[href] = len(css_files)
        css_files.append(inline_assets(fh.read()))

# ---------------------------------------------------------------- pages ----

chromes, chrome_ix = [], {}
scripts, script_ix = [], {}
routes = []
foot = None

SCRIPT_RE = re.compile(r'<script type="module">(.*?)</script>', re.S)

for path in sorted(glob.glob(os.path.join(DIST, '**', 'index.html'), recursive=True)):
    rel = os.path.relpath(path, DIST).replace(os.sep, '/')
    if any(rel.startswith(s) for s in SKIP):
        continue
    with open(path, encoding='utf-8') as fh:
        html = fh.read()

    body = html[html.index('<body'):]
    body = body[body.index('>') + 1:]
    i, j = body.find('<main'), body.find('<footer')
    if i < 0 or j < 0 or j < i:
        continue

    pre, main, tail = body[:i], body[i:j], body[j:]
    src = SCRIPT_RE.findall(tail) + SCRIPT_RE.findall(pre) + SCRIPT_RE.findall(main)
    tail = SCRIPT_RE.sub('', tail).replace('</body>', '').replace('</html>', '')
    pre, main = SCRIPT_RE.sub('', pre), SCRIPT_RE.sub('', main)

    if foot is None:
        foot = inline_assets(tail)

    pre = inline_assets(pre)
    key = hashlib.md5(pre.encode()).hexdigest()
    if key not in chrome_ix:
        chrome_ix[key] = len(chromes)
        chromes.append(pre)

    sids = []
    for s in src:
        k = hashlib.md5(s.encode()).hexdigest()
        if k not in script_ix:
            script_ix[k] = len(scripts)
            scripts.append(s)
        sids.append(script_ix[k])

    head = html[:html.index('</head>')]
    cids = [css_index[h] for h in re.findall(r'<link rel="stylesheet" href="([^"]+)"', head)
            if h in css_index]

    url = '/' + rel[:-len('index.html')].rstrip('/')
    title = re.search(r'<title>(.*?)</title>', head, re.S)
    routes.append({
        'u': url,
        't': (title.group(1).strip() if title else url),
        'c': chrome_ix[key],
        'm': inline_assets(main),
        's': sids,
        'x': cids,
    })

routes.sort(key=lambda r: (r['u'].count('/'), r['u']))

# ------------------------------------------------------------------ emit ----

payload = json.dumps({'routes': routes, 'chromes': chromes, 'scripts': scripts,
                      'css': css_files, 'foot': foot}, separators=(',', ':'))
payload = payload.replace('</script', '<\\/script')

SHELL = open(os.path.join(os.path.dirname(__file__), 'preview-shell.html'),
             encoding='utf-8').read()
out = SHELL.replace('/*__PAYLOAD__*/', payload)
with open(OUT, 'w', encoding='utf-8') as fh:
    fh.write(out)

print('%s  %.2f MB  |  %d routes, %d chromes, %d scripts, %d stylesheets'
      % (OUT, os.path.getsize(OUT) / 1e6, len(routes), len(chromes),
         len(scripts), len(css_files)))
