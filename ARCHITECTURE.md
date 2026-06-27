# JobTracker â€” Architecture Design Document
**Tynovate Internship 2026 Â· AI + Web Development Track Â· Week 1 Deliverable**

---

## 1. Project Overview

### Problem Statement
Job seekers managing an active search typically track dozens of applications across spreadsheets, sticky notes, and browser tabs â€” losing context on follow-ups, missing interview prep, and never knowing why certain applications succeed. JobTracker centralizes the entire job search into one platform: tracking every application through its lifecycle, organizing interview notes and contacts, sending follow-up reminders, and using AI to improve resumes and generate targeted cover letters.

### Target Users
Early-career and mid-level professionals actively searching for jobs who want structured visibility into their pipeline and AI-assisted tools to compete effectively.

---

## 2. Technology Stack

| Layer | Primary Choice | Rationale |
|---|---|---|
| Language | JavaScript / TypeScript-ready | Universal, fast iteration |
| Frontend | React 18 + Vite + TailwindCSS | Fast builds, utility-first CSS, component model |
| Backend | Node.js + Express.js | Same language full-stack, large ecosystem |
| Database | MongoDB + Mongoose | Flexible schemas for evolving job data |
| Auth | JWT + bcryptjs | Stateless, scalable, industry standard |
| AI | OpenAI API (GPT-4o) | Best-in-class NLP for resume/cover letter tasks |
| Notifications | Nodemailer (Week 6) | Email reminders for follow-ups and interviews |
| Analytics | Recharts (Week 6) | Lightweight charting embedded in React |
| Deployment | Docker + GitHub Actions + Render | Containerized, automated CI/CD |

---

## 3. System Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     CLIENT (React 18)                    â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Auth Pages â”‚  â”‚  Dashboard   â”‚  â”‚  Applications  â”‚ â”‚
â”‚  â”‚  Login      â”‚  â”‚  Stats cards â”‚  â”‚  Kanban/Table  â”‚ â”‚
â”‚  â”‚  Register   â”‚  â”‚  Pipelines   â”‚  â”‚  Detail view   â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  Interviews â”‚  â”‚  AI Tools    â”‚  â”‚  Analytics     â”‚ â”‚
â”‚  â”‚  Scheduler  â”‚  â”‚  Cover letterâ”‚  â”‚  Charts/Reportsâ”‚ â”‚
â”‚  â”‚  Notes      â”‚  â”‚  Resume scan â”‚  â”‚  Trends        â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                         â”‚
â”‚         Axios + React Query (data fetching)             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚ HTTPS / REST
                         â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                  SERVER (Node.js + Express)               â”‚
â”‚                                                         â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  /auth   â”‚  â”‚  /apps   â”‚  â”‚/interviewsâ”‚  â”‚  /ai   â”‚ â”‚
â”‚  â”‚  JWT     â”‚  â”‚  CRUD    â”‚  â”‚  CRUD    â”‚  â”‚ OpenAI â”‚ â”‚
â”‚  â”‚  bcrypt  â”‚  â”‚  Stats   â”‚  â”‚  Notes   â”‚  â”‚ Promptsâ”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â”‚                                                         â”‚
â”‚  Middleware: helmet Â· cors Â· rate-limit Â· morgan        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚ Mongoose ODM
                         â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                  DATABASE (MongoDB)                       â”‚
â”‚   Users Â· Applications Â· Interviews Â· Contacts Â· Skills  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚
              â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
              â”‚   External Services  â”‚
              â”‚  OpenAI API (Week 5) â”‚
              â”‚  Nodemailer (Week 6) â”‚
              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 4. Entity Relationship Diagram

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚        USERS        â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ _id (ObjectId) PK   â”‚â—„â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ name                â”‚                             â”‚
â”‚ email (unique)      â”‚                             â”‚
â”‚ password (hashed)   â”‚                             â”‚
â”‚ jobTitle            â”‚                             â”‚
â”‚ location            â”‚                             â”‚
â”‚ bio                 â”‚                             â”‚
â”‚ resumeUrl           â”‚                             â”‚
â”‚ linkedinUrl         â”‚                             â”‚
â”‚ githubUrl           â”‚                             â”‚
â”‚ targetRole          â”‚                             â”‚
â”‚ targetSalary {min,  â”‚                             â”‚
â”‚   max}              â”‚                             â”‚
â”‚ isActive            â”‚                             â”‚
â”‚ createdAt           â”‚                             â”‚
â”‚ updatedAt           â”‚                             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                             â”‚
                                                    â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  user FK       â”‚
â”‚          APPLICATIONS            â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ _id (ObjectId) PK                â”‚â—„â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ user (ref: Users) FK  [indexed]  â”‚                   â”‚
â”‚ company                          â”‚                   â”‚
â”‚ role                             â”‚                   â”‚
â”‚ status (enum)         [indexed]  â”‚                   â”‚
â”‚ jobUrl                           â”‚                   â”‚
â”‚ jobDescription                   â”‚                   â”‚
â”‚ location                         â”‚                   â”‚
â”‚ workType (enum)                  â”‚                   â”‚
â”‚ salaryMin / salaryMax            â”‚                   â”‚
â”‚ appliedDate                      â”‚                   â”‚
â”‚ deadlineDate                     â”‚                   â”‚
â”‚ source (enum)                    â”‚                   â”‚
â”‚ notes                            â”‚                   â”‚
â”‚ aiGeneratedCoverLetter           â”‚                   â”‚
â”‚ aiResumeScore                    â”‚                   â”‚
â”‚ aiMatchScore                     â”‚                   â”‚
â”‚ isFavorite                       â”‚                   â”‚
â”‚ tags []                          â”‚                   â”‚
â”‚ contacts [] (ref: Contacts)      â”‚                   â”‚
â”‚ createdAt / updatedAt            â”‚                   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜                   â”‚
                                                       â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  application FK       â”‚
â”‚          INTERVIEWS          â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ _id (ObjectId) PK            â”‚
â”‚ user (ref: Users) FK         â”‚
â”‚ application (ref: Apps) FK   â”‚
â”‚ round                        â”‚
â”‚ type (enum)                  â”‚
â”‚ scheduledAt       [indexed]  â”‚
â”‚ duration (minutes)           â”‚
â”‚ interviewer                  â”‚
â”‚ interviewerRole              â”‚
â”‚ meetingLink                  â”‚
â”‚ status (enum)                â”‚
â”‚ outcome (enum)               â”‚
â”‚ notes                        â”‚
â”‚ questions [{q, a, difficulty}â”‚
â”‚ selfRating (1-5)             â”‚
â”‚ followUpSent                 â”‚
â”‚ followUpDate                 â”‚
â”‚ createdAt / updatedAt        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚           CONTACTS           â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ _id (ObjectId) PK            â”‚
â”‚ user (ref: Users) FK         â”‚
â”‚ name                         â”‚
â”‚ company                      â”‚
â”‚ role                         â”‚
â”‚ email                        â”‚
â”‚ linkedinUrl                  â”‚
â”‚ phone                        â”‚
â”‚ relationship (enum)          â”‚
â”‚ notes                        â”‚
â”‚ lastContactedAt              â”‚
â”‚ applications [] (ref: Apps)  â”‚
â”‚ createdAt / updatedAt        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚            SKILLS            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ _id (ObjectId) PK            â”‚
â”‚ user (ref: Users) FK         â”‚
â”‚ name                         â”‚
â”‚ category (enum)   [indexed]  â”‚
â”‚ proficiency (enum)           â”‚
â”‚ yearsOfExperience            â”‚
â”‚ isHighlighted                â”‚
â”‚ createdAt / updatedAt        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## 5. API Endpoints (Full Scope)

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Create account | âœ— |
| POST | /api/auth/login | Login, get JWT | âœ— |
| GET | /api/auth/me | Get current user | âœ“ |
| PUT | /api/auth/profile | Update profile | âœ“ |
| POST | /api/auth/change-password | Change password | âœ“ |

### Applications
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/applications | List with filters/pagination | âœ“ |
| GET | /api/applications/stats | Dashboard stats | âœ“ |
| GET | /api/applications/:id | Single application | âœ“ |
| POST | /api/applications | Create application | âœ“ |
| PUT | /api/applications/:id | Update application | âœ“ |
| DELETE | /api/applications/:id | Delete application | âœ“ |

### Interviews
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | /api/interviews | List (filter by application) | âœ“ |
| GET | /api/interviews/:id | Single interview | âœ“ |
| POST | /api/interviews | Create interview | âœ“ |
| PUT | /api/interviews/:id | Update interview | âœ“ |
| DELETE | /api/interviews/:id | Delete interview | âœ“ |

### Contacts & Skills
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET/POST | /api/contacts | List / Create | âœ“ |
| PUT/DELETE | /api/contacts/:id | Update / Delete | âœ“ |
| GET/POST | /api/skills | List / Create | âœ“ |
| PUT/DELETE | /api/skills/:id | Update / Delete | âœ“ |

### AI (Week 5)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | /api/ai/review-resume | Score + feedback on resume text | âœ“ |
| POST | /api/ai/generate-cover-letter | Generate cover letter from JD + resume | âœ“ |
| POST | /api/ai/match-score | Match resume against job description | âœ“ |
| POST | /api/ai/interview-prep | Generate likely interview questions | âœ“ |

---

## 6. 8-Week Feature Delivery Plan

| Week | Focus | Key Deliverable |
|---|---|---|
| 1 | Setup + Architecture | This document + working skeleton |
| 2 | Auth + Database | JWT auth, DB schemas, seed data |
| 3 | Core APIs + CRUD | Full REST API, Postman tests |
| 4 | Dashboard + Frontend | Live dashboard, responsive UI |
| 5 | AI Integration | Resume review, cover letter generator |
| 6 | Notifications + Analytics | Email reminders, charts module |
| 7 | Recommendations + Polish | Job recommendations, UI polish, a11y |
| 8 | Deployment + Demo | Docker, Render deploy, demo video |

### Advanced Features (confirmed)
1. **AI Integration** â€” Resume review, cover letter generation, match scoring (Week 5)
2. **Notification System** â€” Follow-up reminders, interview alerts via email (Week 6)
3. **Analytics Module** â€” Application trends, response rates, source benchmarks (Week 6)
4. **Recommendation System** â€” Job role recommendations based on skills + history (Week 7)

---

## 7. Project Structure

```
jobtracker/
â”œâ”€â”€ client/                    # React 18 + Vite frontend
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”œâ”€â”€ layout/        # AppLayout, Sidebar, Topbar
â”‚   â”‚   â”‚   â”œâ”€â”€ ui/            # Button, Input, Card, Badge, Modal
â”‚   â”‚   â”‚   â””â”€â”€ dashboard/     # StatCard, PipelineChart, RecentList
â”‚   â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”‚   â”œâ”€â”€ auth/          # LoginPage, RegisterPage
â”‚   â”‚   â”‚   â”œâ”€â”€ applications/  # ApplicationsPage, ApplicationDetailPage
â”‚   â”‚   â”‚   â”œâ”€â”€ interviews/    # InterviewsPage
â”‚   â”‚   â”‚   â””â”€â”€ ...
â”‚   â”‚   â”œâ”€â”€ hooks/             # useAuth, useApplications, useStats
â”‚   â”‚   â”œâ”€â”€ lib/               # api.js (axios instance)
â”‚   â”‚   â””â”€â”€ App.jsx            # Router
â”‚   â”œâ”€â”€ Dockerfile
â”‚   â””â”€â”€ nginx.conf
â”‚
â”œâ”€â”€ server/                    # Node.js + Express backend
â”‚   â”œâ”€â”€ models/                # User, Application, Interview, Contact, Skill
â”‚   â”œâ”€â”€ controllers/           # auth, application, interview, contact, skill, ai
â”‚   â”œâ”€â”€ routes/                # auth, application, interview, contact, skill, ai
â”‚   â”œâ”€â”€ middleware/            # auth.middleware.js
â”‚   â”œâ”€â”€ config/                # db.js
â”‚   â”œâ”€â”€ server.js
â”‚   â””â”€â”€ Dockerfile
â”‚
â”œâ”€â”€ .github/workflows/ci.yml  # GitHub Actions
â”œâ”€â”€ docker-compose.yml
â””â”€â”€ README.md
```

---

## 8. Security Practices

- Passwords hashed with bcrypt (12 salt rounds)
- JWTs signed with a secret, 7-day expiry
- All routes except login/register protected by `protect` middleware
- Helmet.js for HTTP security headers
- CORS restricted to frontend origin
- Rate limiting: 100 requests / 15 min global
- Input validation with express-validator on all POST routes
- All DB queries scoped to `req.user._id` (no cross-user data leaks)
- `.env` never committed (`.env.example` only)
