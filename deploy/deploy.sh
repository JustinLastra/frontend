#!/usr/bin/env bash
set -euo pipefail

# NewsExplorer one-command VM deploy script
# Run on your Google Cloud VM from the project root:
#   chmod +x deploy/deploy.sh && ./deploy/deploy.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> Installing frontend dependencies..."
npm install

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

echo "==> Building frontend..."
npm run build

echo "==> Starting/restarting backend with PM2..."
if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2..."
  sudo npm install -g pm2
fi

pm2 delete news-explorer 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo ""
echo "Deploy complete!"
echo "Check status: pm2 status"
echo "View logs:    pm2 logs news-explorer"
echo ""
echo "If using Nginx, copy deploy/nginx.conf.example and restart nginx."
