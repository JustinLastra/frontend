#!/usr/bin/env bash
set -euo pipefail

# First-time setup for a fresh Google Cloud Debian VM
# Run after SSH-ing into your VM:
#   curl -fsSL https://raw.githubusercontent.com/JustinLastra/frontend/cursor/stage-1-submission-f65f/deploy/setup-vm.sh | bash

echo "==> Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "==> Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

echo "==> Installing PM2..."
sudo npm install -g pm2

echo "==> Cloning project..."
if [ -d "$HOME/frontend" ]; then
  cd "$HOME/frontend"
  git fetch origin
  git checkout cursor/stage-1-submission-f65f
  git pull origin cursor/stage-1-submission-f65f
else
  git clone https://github.com/JustinLastra/frontend.git "$HOME/frontend"
  cd "$HOME/frontend"
  git checkout cursor/stage-1-submission-f65f
fi

echo "==> Creating backend .env if missing..."
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo ""
  echo "IMPORTANT: Edit backend/.env before deploying!"
  echo "  nano ~/frontend/backend/.env"
  echo ""
  echo "Set:"
  echo "  JWT_SECRET=some_long_random_string"
  echo "  MONGODB_URI=your_mongodb_atlas_connection_string"
  echo "  NODE_ENV=production"
  echo ""
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. nano ~/frontend/backend/.env   (add JWT_SECRET and MONGODB_URI)"
echo "  2. cd ~/frontend && ./deploy/deploy.sh"
echo "  3. sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/default"
echo "  4. sudo nginx -t && sudo systemctl restart nginx"
