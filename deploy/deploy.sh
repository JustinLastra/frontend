#!/usr/bin/env bash
set -euo pipefail

# NewsExplorer one-command VM deploy script
# Run on your Google Cloud VM from the project root:
#   chmod +x deploy/deploy.sh && ./deploy/deploy.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> Installing frontend dependencies (including devDependencies for build)..."
npm install --include=dev

echo "==> Installing backend dependencies..."
npm install --prefix backend

if [ ! -f backend/.env ]; then
  echo ""
  echo "ERROR: backend/.env not found."
  echo "Create it first:"
  echo "  cp backend/.env.example backend/.env"
  echo "  nano backend/.env"
  echo ""
  echo "Required values:"
  echo "  PORT=3001"
  echo "  JWT_SECRET=your_secret"
  echo "  MONGODB_URI=your_mongodb_connection_string"
  echo "  NODE_ENV=production"
  exit 1
fi

if [ ! -f .env ]; then
  echo "==> Creating frontend .env from example..."
  cp .env.example .env
fi

echo "==> Ensuring production API URL uses same-origin requests..."
if grep -q '^VITE_API_BASE_URL=' .env; then
  sed -i 's|^VITE_API_BASE_URL=.*|VITE_API_BASE_URL=|' .env
else
  echo "VITE_API_BASE_URL=" >> .env
fi

echo "==> Building frontend..."
npm run build

if grep -rq "localhost:3001" dist/; then
  echo ""
  echo "ERROR: Production build still references localhost:3001."
  echo "Ensure VITE_API_BASE_URL is empty in .env and .env.production, then rebuild."
  exit 1
fi

echo "==> Production build verified (no localhost API URL)."

echo "==> Starting/restarting backend with PM2..."
if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2..."
  sudo npm install -g pm2
fi

pm2 delete news-explorer 2>/dev/null || true
pm2 start ecosystem.config.cjs --update-env
pm2 save

if command -v nginx >/dev/null 2>&1; then
  echo "==> Configuring Nginx..."
  sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/default
  sudo nginx -t
  sudo systemctl restart nginx
fi

echo ""
echo "Deploy complete!"
echo "Check status: pm2 status"
echo "View logs:    pm2 logs news-explorer"
echo ""
echo "If using Nginx, copy deploy/nginx.conf.example and restart nginx."
