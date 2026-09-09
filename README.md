# NewsExplorer

A full-stack news search application that lets users find articles via the News API, sign in, and save articles to a personal account.

## Project links

- **Live site:** [http://35.253.182.214](http://35.253.182.214)
- **Pull request:** [https://github.com/JustinLastra/frontend/pull/3](https://github.com/JustinLastra/frontend/pull/3)
- **Project video:** Replace `VITE_PROJECT_VIDEO_URL` in `.env` with your pitch video link, then update this line before resubmitting

## About the project

NewsExplorer allows users to search for news articles by keyword, view results with pagination, create an account, and save articles to a personal collection.

## Features

- Search news by keyword with validation and loading states
- Display article cards with image, date, description, and source
- Paginated results with "Show more" (3 articles at a time)
- Sign in / Sign up modals with open/close behavior
- JWT authentication with Express backend
- Save and delete articles via REST API
- Saved Articles page for logged-in users

## For reviewers — run locally

### Frontend only (search, modals, UI)

Search works with mock data. No backend required.

```bash
git clone https://github.com/JustinLastra/frontend.git
cd frontend
git checkout cursor/stage-1-submission-f65f
npm install
npm run dev
```

Open **http://localhost:5173**

### Full app (login + save articles)

**Terminal 1 — backend:**
```bash
cd backend
npm install
cp .env.example .env
# Add MongoDB Atlas connection string to backend/.env
npm run dev
```

**Terminal 2 — frontend:**
```bash
npm install
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:3001
npm run dev
```

Open **http://localhost:5173**

## Deployment

Deployed on **Google Cloud VM** (not GitHub Pages):

**http://35.253.182.214**

- Frontend built with Vite and served by Express
- Nginx proxies port 80 to the backend on port 3001
- MongoDB Atlas for database storage

### Update deployment on VM

```bash
cd ~/frontend
git pull origin cursor/stage-1-submission-f65f
./deploy/deploy.sh
```

## API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/signin` | No | Sign in and receive JWT |
| GET | `/users/me` | Bearer JWT | Get current user |
| GET | `/articles` | Bearer JWT | Get saved articles |
| POST | `/articles` | Bearer JWT | Save an article |
| DELETE | `/articles/:articleId` | Bearer JWT | Delete a saved article |

## Tech stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt
- **News:** News API
- **Deployment:** Google Cloud VM, Nginx, PM2, MongoDB Atlas
