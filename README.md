# JobTracker ðŸš€

**AI-powered job application tracker** â€” built for the Tynovate Internship 2026, AI + Web Development Track.

> Track every application, prep for every interview, and let AI write your cover letters.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, React Query |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcryptjs |
| AI | OpenAI API (GPT-4o) |
| Notifications | Nodemailer (Week 6) |
| DevOps | Docker, GitHub Actions, Render |

---

## Features

### Minimum Requirements âœ…
- [x] JWT authentication (register, login, logout, session)
- [x] MongoDB database with designed schemas and indexes
- [x] Interactive dashboard with live stats
- [x] Full CRUD for applications, interviews, contacts, skills
- [x] Responsive UI â€” desktop and mobile

### Advanced Features (in progress)
- [ ] **AI Integration** â€” Resume review, cover letter generation, match scoring (Week 5)
- [ ] **Notification System** â€” Email follow-up reminders and interview alerts (Week 6)
- [ ] **Analytics Module** â€” Application trends, response rates, source benchmarks (Week 6)
- [ ] **Recommendation System** â€” Job role recommendations based on profile (Week 7)

---

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB running locally OR MongoDB Atlas URI
- npm

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/jobtracker.git
cd jobtracker

# 2. Install all dependencies
npm run install:all

# 3. Configure server environment
cp server/.env.example server/.env
# Edit server/.env and set MONGO_URI and JWT_SECRET

# 4. Start both frontend and backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

### Environment Variables

Create `server/.env` from `server/.env.example`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobtracker
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=   # needed from Week 5
```

### Docker (Production)

```bash
# Build and run all services
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET | /api/applications | List applications |
| GET | /api/applications/stats | Dashboard stats |
| POST | /api/applications | Create application |
| PUT | /api/applications/:id | Update application |
| DELETE | /api/applications/:id | Delete application |
| GET | /api/interviews | List interviews |
| POST | /api/interviews | Create interview |
| GET | /api/contacts | List contacts |
| GET | /api/skills | List skills |

Full API documentation: see `ARCHITECTURE.md`

---

## Project Structure

```
jobtracker/
â”œâ”€â”€ client/          # React 18 frontend
â”œâ”€â”€ server/          # Express.js API
â”œâ”€â”€ ARCHITECTURE.md  # System design doc + ERD
â”œâ”€â”€ docker-compose.yml
â””â”€â”€ README.md
```

---

## Week-by-Week Roadmap

| Week | Focus |
|---|---|
| 1 | âœ… Setup, architecture, project skeleton |
| 2 | Auth system + database schemas |
| 3 | Core REST APIs + CRUD |
| 4 | Dashboard + responsive frontend |
| 5 | AI integration |
| 6 | Notifications + analytics |
| 7 | Recommendations + polish |
| 8 | Deployment + demo |

---

## Author

Built by [Your Name] as part of the Tynovate Internship Program 2026.
