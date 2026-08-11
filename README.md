# NewsExplorer

A React news search application that lets users find articles via the News API, sign in, and save articles to a personal account.

**Live demo:** [https://justinlastra.github.io/frontend/](https://justinlastra.github.io/frontend/)

## Features

- Search news by keyword with validation and loading states
- Display article cards with image, date, description, and source
- Paginated results with "Show more" (3 articles at a time)
- Sign in / Sign up modals with open/close behavior
- Simulated auth and saved articles (localStorage)
- Saved Articles page for logged-in users

## Local Development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example and add your News API key:

```bash
cp .env.example .env
```

Get a free API key at [newsapi.org](https://newsapi.org).

3. Start the development server:

```bash
npm run dev
```

If no API key is set, the app uses hard-coded mock article data for development.

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

Production builds automatically use the News API proxy at `https://nomoreparties.co/news/v2/everything`.

## Tech Stack

- React 19
- Vite
- React Router
- News API
