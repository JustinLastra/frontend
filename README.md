# NewsExplorer

A full-stack news search application that lets users find articles via the News API, sign in, and save articles to a personal account.

## Project links

- **Live site:** `https://YOUR-DOMAIN.students.nomoreparties.site` *(replace with your Google Cloud URL)*
- **Project video:** [Watch the project walkthrough](https://YOUR-VIDEO-LINK-HERE) *(replace with your recorded video URL)*

## Features

- Search news by keyword with validation and loading states
- Display article cards with image, date, description, and source
- Paginated results with "Show more" (3 articles at a time)
- Sign in / Sign up with JWT authentication
- Save and delete articles via REST API
- Saved Articles page for logged-in users

## Project structure

```
frontend/   React + Vite client (project root)
backend/    Express + MongoDB API
```

## Local development

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Set these values in `backend/.env`:

```
PORT=3001
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
```

MongoDB must be running locally or use a MongoDB Atlas connection string.

### 2. Frontend

In a second terminal, from the project root:

```bash
npm install
cp .env.example .env
npm run dev
```

Open **http://localhost:5173** in your browser.

Set these values in `.env`:

```
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_API_BASE_URL=http://localhost:3001
```

Search works with mock data if no News API key is set. Login and save features require the backend to be running.

## API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/signin` | No | Sign in and receive JWT |
| GET | `/users/me` | Bearer JWT | Get current user |
| GET | `/articles` | Bearer JWT | Get saved articles |
| POST | `/articles` | Bearer JWT | Save an article |
| DELETE | `/articles/:articleId` | Bearer JWT | Delete a saved article |

## Deployment (Google Cloud)

This project includes a backend, so deploy to your Google Cloud VM (same approach as the WTWR project in Sprint 15). GitHub Pages is not suitable for full-stack apps.

### First-time setup on your VM

```bash
# 1. SSH into your Google Cloud VM, then clone the repo
git clone https://github.com/JustinLastra/frontend.git
cd frontend
git checkout cursor/stage-1-submission-f65f

# 2. Create backend environment file
cp backend/.env.example backend/.env
nano backend/.env
```

Set these in `backend/.env`:

```
PORT=3001
JWT_SECRET=your_long_random_secret
MONGODB_URI=mongodb+srv://YOUR_ATLAS_CONNECTION_STRING
NODE_ENV=production
```

```bash
# 3. Run the one-command deploy script
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### Nginx (if you used it for WTWR)

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
```

Replace `justinlastra` in the nginx config with your TripleTen subdomain if different.

### After every code update

```bash
cd ~/frontend
git pull
./deploy/deploy.sh
```

### Optional: GitHub Actions auto-deploy

Add these secrets in GitHub → Settings → Secrets → Actions:

- `GCP_HOST` — your VM external IP
- `GCP_USER` — your VM username
- `GCP_SSH_KEY` — your private SSH key

Then run the **Deploy to Google Cloud VM** workflow manually from the Actions tab.

## Tech stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt
- **News:** News API
