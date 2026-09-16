#!/bin/sh
# Turn on automatic deploys, from the server's side.
#
# Run this once, as root, on the machine that serves hyperporter.com:
#
#   curl -fsSL https://raw.githubusercontent.com/benjamingjoel2/hyperporter/main/scripts/enable-auto-deploy.sh | sh
#
# It does two things:
#
#   1. Pulls the current build straight away, so the site is up to date the
#      moment it finishes.
#   2. Installs a job that checks GitHub once a minute and pulls again
#      whenever CI has published a new build.
#
# That replaces the SSH-key setup in DEPLOY.md. Nothing has to reach into the
# server from outside: the server asks GitHub, over plain HTTPS, for a branch
# that is public anyway. There is no key to generate, store, rotate or leak.
#
# Safe to run twice — it replaces its own files rather than stacking up.
set -eu

SITE=${SITE:-/opt/hyperporter/site}

if [ ! -d "$SITE/.git" ]; then
  echo "No git checkout at $SITE — is this the right machine?" >&2
  exit 1
fi

# --- 1. pull what is on the deploy branch right now -------------------------
cd "$SITE"
git fetch --quiet --depth 1 origin deploy
git reset -q --hard origin/deploy
echo "Pulled build $(cut -c1-7 build.txt 2>/dev/null || echo 'unknown')."

# --- 2. the job itself ------------------------------------------------------
cat > /usr/local/bin/hyperporter-pull <<EOF
#!/bin/sh
# Installed by scripts/enable-auto-deploy.sh. Pulls the newest build, if any.
set -eu
cd $SITE
git fetch --quiet --depth 1 origin deploy
git reset -q --hard origin/deploy
EOF
chmod +x /usr/local/bin/hyperporter-pull

# --- 3. run it every minute -------------------------------------------------
if command -v systemctl >/dev/null 2>&1 && [ -d /etc/systemd/system ]; then
  cat > /etc/systemd/system/hyperporter-pull.service <<'EOF'
[Unit]
Description=Pull the newest Hyperporter build
[Service]
Type=oneshot
ExecStart=/usr/local/bin/hyperporter-pull
EOF
  cat > /etc/systemd/system/hyperporter-pull.timer <<'EOF'
[Unit]
Description=Check for a new Hyperporter build every minute
[Timer]
OnBootSec=1min
OnUnitActiveSec=1min
AccuracySec=10s
[Install]
WantedBy=timers.target
EOF
  systemctl daemon-reload
  systemctl enable --now hyperporter-pull.timer >/dev/null
  echo "Automatic deploys are ON (systemd timer, every minute)."
  echo "To check on it later:  systemctl list-timers hyperporter-pull"
else
  ( crontab -l 2>/dev/null | grep -v 'hyperporter-pull' || true
    echo '* * * * * /usr/local/bin/hyperporter-pull' ) | crontab -
  echo "Automatic deploys are ON (cron, every minute)."
  echo "To check on it later:  crontab -l"
fi

echo
echo "From now on, every change merged to main is live within a minute."
