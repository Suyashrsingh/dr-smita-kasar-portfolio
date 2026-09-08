# Dr. Smita Lalit Kasar - Academic Portfolio & Research Lab CMS

> **Modern, High-Performance Academic Portfolio and Faculty CMS for Dr. Smita Lalit Kasar**  
> *Professor & Head of Department, Computer Science & Engineering (MIT Aurangabad / Chhatrapati Sambhajinagar)*  
> *Sir M. Visvesvaraya Outstanding Engineer Awardee 2023 | Ph.D. in Computer Engineering (SPPU Pune)*

---

## 🌟 Overview & Key Features

A full-stack, responsive academic portfolio and content management system built with **React**, **Vite**, **Tailwind CSS**, **Node.js/Express**, and **MongoDB Atlas**.

### 💻 Public Academic Features:
1. **Hero & Scholar Highlights**: Clean personal introduction, research focus chips, Sir M. Visvesvaraya Award badge, and verified metrics strip.
2. **Scholarly Profile & Biography**: Educational background (Ph.D., M.E., B.E.), career milestones, leadership roles, and scholarly indexing (**Google Scholar, Scopus, ORCID, ResearchGate, LinkedIn**).
3. **Research Areas**: Deep-dive interactive cards covering AI & Deep Learning, Healthcare ML, Blockchain Systems, Cybersecurity, and Cloud/Edge IoT.
4. **Funded Projects**: Tracks AICTE, SPPU BCUD, RGSTC, UGC, and industrial sponsored research grants with funding agency details, grant amounts, duration, and status.
5. **Publications Database**: Searchable, filterable database by category (*Journals, Conferences, Book Chapters, Patents*) and year, with APA citation copy and DOI/PDF links.
6. **Awards & Honors**: Highlighting national and state accolades with certificate preview modal.
7. **Workshops & FDPs**: Filterable catalog of faculty development programs, STTPs, and masterclasses.
8. **E-Content & Downloadable Study Notes**: Searchable lecture notes with direct `.txt` and PDF file download options.
9. **Online Quizzes & Assessments**: Interactive timed multiple-choice tests with real-time scoring, review, and analytics.
10. **Moments Gallery**: Categorized photo memories of campus events, conferences, and student activities with lightbox viewer.
11. **Contact & Inquiries**: Direct messaging form with validation that saves queries directly to the database.

---

## 🔒 Faculty Admin CMS (Content Management System)

- **Access URL**: `/admin/login`
- **Authentication**: JWT token-based authentication with bcrypt password hashing.
- **Admin Capabilities**:
  - 📊 **Dashboard Overview**: Live count of all publications, grants, notes, tests, and database connection status.
  - 📚 **Publications Management**: Add, edit, toggle publish/draft, and delete publications.
  - 💡 **Funded Projects Management**: Manage AICTE, SPPU BCUD, and industrial sponsored research grants.
  - 📝 **E-Content / Study Material**: Upload lecture notes, attachments, and learning materials.
  - 🧪 **Online Tests & Submissions**: Create timed quizzes and view student submission scores.
  - 🏆 **Awards & Distinctions**: Manage faculty honors and recognitions.
  - 🎤 **Workshops & FDPs**: Manage training sessions and events.
  - 🖼️ **Photo Moments Gallery**: Upload and manage event images (persisted directly to MongoDB Atlas).
  - 📬 **Messages Inbox**: Review and manage student and visitor inquiries.
  - ⚙️ **Faculty Profile Settings**: Update bio, stats, and scholarly links.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18 & Vite 6
  - Tailwind CSS 3 (macOS-inspired glassmorphism design system & Dark/Light mode)
  - Lucide React icons & Framer Motion
  - React Router DOM (v6 with route-level code-splitting and Suspense)
  - Axios HTTP Client
- **Backend**:
  - Node.js & Express
  - MongoDB Atlas (Mongoose ODM) with resilient local memory cache fallback
  - JSON Web Tokens (JWT) & bcryptjs
  - Multer file uploads
- **Deployment & Speed**:
  - Rollup manual chunking (`vendor-react`, `vendor-ui`, `vendor-http`)
  - Serverless architecture ready for Vercel deployment via `vercel.json`

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone https://github.com/Suyashrsingh/dr-smita-kasar-portfolio.git
cd dr-smita-kasar-portfolio

# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
cd ..
```

### 2. Configuration
Configure your local environment variables in `server/.env` or in your deployment platform (Vercel) dashboard:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for authentication tokens
- `ADMIN_EMAIL` - Faculty administrator email
- `ADMIN_PASSWORD` - Administrator access password

### 3. Run Locally
Run both client and server concurrently:
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## ☁️ Vercel Deployment

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add the required Environment Variables in the Vercel project settings.
4. Click **Deploy**. Vercel will automatically build the client and deploy the serverless API routes according to [`vercel.json`](./vercel.json).

---

## 📄 License

This project is licensed under the MIT License.
