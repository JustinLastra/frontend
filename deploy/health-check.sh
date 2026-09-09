#!/usr/bin/env bash
set -euo pipefail

echo "==> NewsExplorer VM health check"

echo ""
echo "--- PM2 status ---"
pm2 status || echo "PM2 not running"

echo ""
echo "--- Backend on port 3001 ---"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1:3001 || echo "Backend not responding"

echo ""
echo "--- Nginx on port 80 ---"
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1 || echo "Nginx not responding"

echo ""
echo "--- dist folder ---"
ls -la ~/frontend/dist 2>/dev/null || ls -la dist 2>/dev/null || echo "dist folder missing - run npm run build"

echo ""
echo "--- backend .env ---"
if [ -f ~/frontend/backend/.env ]; then
  grep -E '^(PORT|MONGODB_URI|NODE_ENV)=' ~/frontend/backend/.env | sed 's/MONGODB_URI=.*/MONGODB_URI=***/'
else
  echo "backend/.env not found"
fi

echo ""
echo "--- Recent PM2 logs ---"
pm2 logs news-explorer --lines 5 --nostream 2>/dev/null || true

echo ""
echo "If port 3001 works but port 80 does not, run:"
echo "  sudo cp ~/frontend/deploy/nginx.conf.example /etc/nginx/sites-available/default"
echo "  sudo nginx -t && sudo systemctl restart nginx"
