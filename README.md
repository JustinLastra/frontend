# NewsExplorer

A full-stack news search application that lets users find articles via the News API, sign in, and save articles to a personal account backed by a Node.js API and MongoDB.

**Live demo:** [https://justinlastra.github.io/frontend/](https://justinlastra.github.io/frontend/)

## Features

- Search news by keyword with validation and loading states
- Display article cards with image, date, description, and source
- Paginated results with "Show more" (3 articles at a time)
- Sign in / Sign up with JWT authentication
- Save and delete articles via REST API
- Saved Articles page for logged-in users

## Project Structure

```
frontend/          React + Vite client
backend/           Express + MongoDB API
```

## Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Set your MongoDB connection string and JWT secret in `.env`:

```
PORT=3001
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
```

4. Start the API server:

```bash
npm run dev
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/signin` | No | Sign in and receive JWT |
| GET | `/users/me` | Bearer JWT | Get current user |
| GET | `/articles` | Bearer JWT | Get saved articles |
| POST | `/articles` | Bearer JWT | Save an article |
| DELETE | `/articles/:articleId` | Bearer JWT | Delete a saved article |

## Frontend Setup

1. Install dependencies from the project root:

```bash
npm install
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Configure environment variables:

```
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_API_BASE_URL=http://localhost:3001
```

Get a free News API key at [newsapi.org](https://newsapi.org).

4. Start the development server:

```bash
npm run dev
```

If no News API key is set, the app uses hard-coded mock article data for search results.

## Deployment

### Frontend (GitHub Pages)

```bash
npm run deploy
```

Production builds use the News API proxy at `https://nomoreparties.co/news/v2/everything`.

Set `VITE_API_BASE_URL` to your deployed backend URL before building for production.

### Backend

Deploy the Express API to your server (e.g. Google Cloud VM) and point the frontend `VITE_API_BASE_URL` at that URL.

## Tech Stack

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt
- **News:** News API
