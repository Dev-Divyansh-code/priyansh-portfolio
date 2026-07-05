# Priyansh Portfolio

A full-stack MERN portfolio for a video editor and creative professional. The public site showcases profile, work gallery, projects, and a contact form. A protected admin dashboard manages all content from MongoDB.

## Live demo

Deploy with the included [Render](https://render.com) blueprint (`render.yaml`).

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite, Tailwind CSS 4, GSAP, React Router |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Tooling | Concurrently, Render |

## Project structure

```
priyansh-mern/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/   # Hero, WorkGallery, Projects, Contact, etc.
│       ├── pages/        # Portfolio + admin pages
│       └── api/          # API client helpers
├── server/          # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── seed/        # Sample portfolio data
├── render.yaml      # One-click Render deployment
└── package.json     # Root scripts (dev, build, start)
```

## Features

- Animated portfolio with theme switcher
- Work gallery and project showcase
- Contact form with message storage
- Admin dashboard at `/admin` (profile, works, projects, messages)
- Production-ready: serves built React app from Express

## Prerequisites

- Node.js 20+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Local setup

```bash
# 1. Clone the repo
git clone https://github.com/divyansht111/priyansh-portfolio.git
cd priyansh-portfolio

# 2. Install dependencies (root, server, and client)
npm run install:all

# 3. Configure environment
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and admin API key

# 4. Seed the database
npm run seed

# 5. Start dev servers (API on :5001, Vite on :5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the portfolio and [http://localhost:5173/admin/login](http://localhost:5173/admin/login) for the admin panel.

## Environment variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default `5001`) |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_URL` | Frontend origin for CORS in development |
| `ADMIN_API_KEY` | Secret key for admin API routes |

See `server/.env.example` for a full template.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run API and Vite dev servers together |
| `npm run install:all` | Install all dependencies |
| `npm run seed` | Populate MongoDB with sample data |
| `npm run build` | Build the React client |
| `npm start` | Run production server |
| `npm run start:prod` | Build client, then start server |

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Portfolio profile |
| GET | `/api/works` | Work gallery items |
| GET | `/api/projects` | Project list |
| POST | `/api/contact` | Submit contact message |
| * | `/api/admin/*` | Protected admin CRUD (requires `x-admin-key` header) |

## Deployment (Render)

1. Push this repo to GitHub.
2. Create a new **Blueprint** on Render and connect the repo.
3. Set `MONGODB_URI` and `CLIENT_URL` in the Render dashboard.
4. Render auto-generates `ADMIN_API_KEY`.

The `render.yaml` file configures build and start commands for you.

## License

Private portfolio project. All rights reserved.