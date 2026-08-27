# NewsExplorer

A full-stack news search application that lets users find articles via the News API, sign in, and save articles to a personal account.

## Project links

- **Live site:** [http://35.253.182.214](http://35.253.182.214)
- **Project video:** [Watch the project walkthrough](https://YOUR-VIDEO-LINK-HERE) *(replace with your recorded video URL before resubmitting)*

## For reviewers — run locally

### Frontend only (search works with mock data)

```bash
git clone https://github.com/JustinLastra/frontend.git
cd frontend
git checkout cursor/stage-1-submission-f65f
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

Search works without a News API key (mock articles are used). No backend is required to test search, modals, and UI.

### Full app (login + save articles)

**Terminal 1 — backend:**
```bash
cd backend
npm install
cp .env.example .env
# Set MONGODB_URI to a MongoDB Atlas connection string in backend/.env
npm run dev
```

**Terminal 2 — frontend:**
```bash
npm install
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:3001 in .env
npm run dev
```

Open **http://localhost:5173**

## Features

- Search news by keyword with validation and loading states
- Display article cards with image, date, description, and source
- Paginated results with "Show more" (3 articles at a time)
- Sign in / Sign up with JWT authentication
- Save and delete articles via REST API
- Saved Articles page for logged-in users

## Deployment

This project is deployed on **Google Cloud** (not GitHub Pages):

**Live URL:** http://35.253.182.214

The backend serves the built React frontend from the same server on port 3001, proxied through Nginx on port 80.

### Deploy updates on the VM

```bash
cd ~/frontend
git pull origin cursor/stage-1-submission-f65f
./deploy/deploy.sh
```

## Tech stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt
- **News:** News API
