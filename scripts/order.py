"""Find declarations inside a max-width media block that a later bare rule
undoes at equal specificity. That is a rule that looks written and is not."""
import re, sys, pathlib

css = (pathlib.Path(__file__).resolve().parent.parent / 'src/styles/global.css').read_text()

# strip comments, keeping offsets roughly by replacing with spaces
css_nc = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), css, flags=re.S)

# walk top level, tracking brace depth and whether we are inside @media(max-width)
rules = []          # (selector, prop, order_index, media_or_None, value)
i = 0; n = len(css_nc); order = 0
stack = []          # at-rule conditions
buf = ''
while i < n:
    c = css_nc[i]
    if c == '{':
        head = buf.strip(); buf = ''
        if head.startswith('@'):
            stack.append(head)
        else:
            # read the declaration block
            depth = 1; j = i + 1
            while j < n and depth:
                if css_nc[j] == '{': depth += 1
                elif css_nc[j] == '}': depth -= 1
                j += 1
            body = css_nc[i+1:j-1]
            media = next((s for s in stack if s.startswith('@media')), None)
            for sel in head.split(','):
                sel = ' '.join(sel.split())
                if not sel: continue
                for decl in body.split(';'):
                    if ':' not in decl: continue
                    prop, val = decl.split(':', 1)
                    prop = prop.strip().lower(); val = ' '.join(val.split())
                    if not prop or prop.startswith('--'): continue
                    order += 1
                    rules.append((sel, prop, order, media, val))
            i = j; continue
        i += 1; continue
    if c == '}':
        if stack: stack.pop()
        buf = ''; i += 1; continue
    buf += c; i += 1

MAXW = re.compile(r'max-width\s*:\s*(\d+)')
losses = []
for sel, prop, o, media, val in rules:
    if not media or 'max-width' not in media: continue
    mw = int(MAXW.search(media).group(1))
    for sel2, prop2, o2, media2, val2 in rules:
        if sel2 != sel or prop2 != prop or o2 <= o: continue
        if val2 == val: continue   # restating the same value is not a loss
        if media2 is None:
            losses.append((sel, prop, mw, o, o2, 'bare rule'))
        elif 'max-width' in media2 and int(MAXW.search(media2).group(1)) >= mw:
            losses.append((sel, prop, mw, o, o2, media2.strip()))
        elif 'min-width' not in media2 and 'max-width' not in media2:
            losses.append((sel, prop, mw, o, o2, media2.strip()))

seen = set(); out = []
for l in losses:
    k = (l[0], l[1], l[2])
    if k in seen: continue
    seen.add(k); out.append(l)

print(f'{len(out)} mobile declaration(s) overridden by a later rule at equal specificity\n')
for sel, prop, mw, o, o2, who in sorted(out):
    print(f'  @media(max-width:{mw}) {sel} {{ {prop} }}  <-- lost to {who}')
