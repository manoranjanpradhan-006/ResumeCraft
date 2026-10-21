# ResumeCraft — Build Your Professional Identity

**ResumeCraft** is a modern, full-stack, ATS-friendly career suite and resume builder built with JavaScript (Node.js + Express + React). It empowers job seekers, engineers, students, and professionals to build high-impact resumes, match resumes against job descriptions to calculate shortlisting probabilities, identify resume weaknesses with actionable fixes, and run deep ATS passability audits.

> **Tagline:** Your experience. Your skills. Your story.

---

## Highlights & Features

### 1. High-Converting Landing Page
- **All-in-One Career Dashboard:** Seamless navigation between the **Landing Page**, **Resume Builder**, **Job Description Matcher**, and **ATS Checker**.
- **Modern Aesthetics:** Vibrant gradients, dark mode glassmorphism, responsive mobile toggles, and micro-animations.

### 2. Live Resume Generator & Preview Engine
- **ATS-Friendly by Design:** Engineered with a single-column semantic structure, standard section headers, clean typography, and optimal keyword density that passes applicant tracking systems (Workday, Greenhouse, Lever, BambooHR).
- **Multiple Professional Templates:**
  - **ATS-Friendly (Recommended):** High-parseability single-column layout with clean bullet points.
  - **Minimal (Recommended):** Modern Scandinavian minimalism with hairline dividers and elegant typography.
  - **Modern:** Contemporary gradient accents and pill badge styling.
  - **Classic:** Formal serif typography for executive and academic applications.
- **Instant Live Preview:** True-to-life A4 document preview that updates in real time as you edit.
- **Direct PDF Export:** Native high-resolution `@media print` scoped stylesheet that exports a clean PDF with no browser clutter.

### 3. Job Description Matcher & Shortlisting Predictor
- **Match Score (0–100%):** Calculates semantic and keyword alignment between your resume and any job posting.
- **Shortlisting Chance:** Predicts your interview callback probability (**High: 80–95%**, **Moderate: 55–79%**, or **Low: <50%**).
- **Keywords Matrix:** Discloses keywords found in both documents vs. critical missing ATS keywords.
- **⚠️ What Is Holding Your Resume Back:** Pinpoints exact weaknesses (e.g. missing required tech stack, lack of quantified metrics, missing tailored summary).
- **💡 Actionable Fixes:** Provides concrete, step-by-step suggestions on how to modify your resume to close the gap.

### 4. Deep ATS Score & Health Checker
- **Overall ATS Score (0–100) & Letter Grade:** Instant audit with grades ranging from **A+** to **D**.
- **5-Category Breakdown:**
  1. Contact & Profile Links (Email, Phone, LinkedIn, Location)
  2. Executive Summary Quality (Length, clarity, target alignment)
  3. Experience & Action Metrics (Quantified numbers, %, $, DAU counts)
  4. Technical Keyword Density (Core technologies, frameworks, tools)
  5. Formatting & Layout Cleanliness (Parser safety, single-column integrity)
- **Strengths, Detected Issues & Improvement Roadmap:** Clear guidance on reaching 95%+ passability.

### 5. ✨ AI Writing Assistant
- **Professional Summary Polish:** Transforms raw drafts into punchy 3–4 sentence elevator pitches.
- **XYZ Bullet Point Polisher:** Rewrites experience bullets into Google's XYZ format (*Accomplished [X], measured by [Y], by doing [Z]*).
- **Dual Engine:** Works seamlessly out-of-the-box using a built-in heuristic action-verb engine, and upgrades to **Google Gemini 1.5 Flash** when an API key is provided!

### 6. Dual Persistence Architecture (Zero-Setup Local + Free Cloud DB)
- **Local Mode:** Automatically falls back to a local JSON file store (`backend/data/store.json`) when offline or developing locally—**no database installation required**!
- **Free Cloud Mode:** Connects seamlessly to a free **MongoDB Atlas M0** cluster by simply adding `MONGODB_URI` to your `backend/.env`.

---

## How It Works Under the Hood

### 1. Resume Generation & Presentation Separation
Traditional resumes mix content with formatting. ResumeCraft stores all resume data in a clean, JSON-serializable state (`personal`, `summary`, `experience`, `skills`, `projects`, `education`, `certifications`). The selected template (e.g., `AtsTemplate`, `MinimalTemplate`) receives this pure data and renders it with strict CSS print rules. When you switch templates, your data stays intact.

### 2. Job Description Matching & Shortlisting Probability
When you submit your resume and a target job description:
1. **Extraction:** The system parses both texts into normalized tokens, identifying technical keywords, frameworks, tools, and domain requirements.
2. **Intersection & Gap Analysis:** Compares the presence of required JD skills against your resume content.
3. **Shortlisting Probability Calculation:** The match percentage is weighted based on required skill coverage, years of experience alignment, and action verb density:
   - **Match Score ≥ 78%** $\rightarrow$ **High Shortlisting Chance (80–95%)**
   - **Match Score 55%–77%** $\rightarrow$ **Moderate Shortlisting Chance (55–79%)**
   - **Match Score < 55%** $\rightarrow$ **Low Shortlisting Chance (<50%)**
4. **Diagnosis & Actionable Fixes:** Gaps are transformed into direct coaching instructions (e.g., *"Integrate Kafka and Docker into your Skills section and add a metric to your latest role"*).

### 3. ATS Health & Passability Audit
Automated Applicant Tracking Systems (ATS) reject up to 75% of resumes due to unparseable layouts, missing contact headers, or low keyword density. The ATS Checker evaluates:
- **Parseable Contact Data:** Checks for standard email formats, international phone patterns, and clean LinkedIn URLs.
- **Impact Metrics:** Scans for numerical markers (`%`, `$`, `x`, `users`, `latency`, `ms`).
- **Standard Header Detection:** Verifies standard section naming so parsers categorize entries into the correct database columns.

---

## 🔑 How to Find and Link Your Google Gemini API Key

ResumeCraft works out of the box with an intelligent built-in rule engine, but you can unlock advanced LLM contextual reasoning using Google's **Gemini 1.5 Flash API** for **free**.

### Step 1: Get Your Free Gemini API Key
1. Go to **Google AI Studio**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account.
3. Click the blue button **"Create API key"** (or **"Get API key"**).
4. Select or create a Google Cloud project (takes 5 seconds, no billing or credit card required for standard free quota).
5. Copy your generated API key (it starts with `AIzaSy...`).

### Step 2: Link It to ResumeCraft
1. Open the file `backend/.env` in your project:
   ```env
   # backend/.env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=
   JWT_SECRET=resumecraft_super_secret_jwt_key_development_2026

   # Paste your Gemini API key here:
   GEMINI_API_KEY=AIzaSyYourGeneratedGeminiKeyHere
   ```
2. Save the file.
3. The Express backend will automatically detect the key. Now, all summary polish, experience bullet enhancement, JD matching, and ATS checks will run directly through **Google Gemini 1.5 Flash**!

---

## Technology Stack (100% JavaScript)

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS + Tailwind CSS v4
- **Icons:** Lucide React & custom SVGs
- **Celebration Effects:** Canvas Confetti

### Backend
- **Runtime:** Node.js (ES Modules, `"type": "module"`)
- **Server:** Express.js
- **Auth:** JSON Web Tokens (JWT) + BcryptJS password hashing
- **Database / Storage:** MongoDB with Mongoose (with seamless local file store fallback)
- **AI Integration:** Google Gemini 1.5 Flash REST API + heuristic fallback engine

---

## Project Structure

```text
ResumeCraft/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment variables & paths
│   │   ├── controllers/     # Auth, Resume CRUD, AI Enhancer, JD Matcher, ATS Checker
│   │   ├── middleware/      # JWT verification & error handling
│   │   ├── routes/          # Express route definitions (/auth, /resumes, /ai)
│   │   ├── services/        # Unified storage (Mongo Atlas + Local JSON store)
│   │   └── server.js        # Express app entry point
│   ├── data/                # Local data store (when MongoDB is not connected)
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, AuthModal, SavedResumesModal
│   │   ├── data/            # Comprehensive sample resume demo data
│   │   ├── features/
│   │   │   ├── landing/     # LandingPage component with feature showcase & guide
│   │   │   ├── tools/       # JobDescriptionMatcher & AtsChecker tools
│   │   │   ├── editor/      # PersonalInfo, Summary, Experience, Skills, Education, Projects, Certs
│   │   │   └── preview/     # A4 paper preview, zoom controls, ATS score badge
│   │   ├── services/        # API client for auth, resumes, and AI
│   │   ├── templates/       # AtsTemplate, MinimalTemplate, ModernTemplate, ClassicTemplate
│   │   ├── utils/           # resumeToText serializer
│   │   ├── App.jsx          # Main application orchestration & tab navigation
│   │   ├── index.css        # Print styles & responsive layout
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json             # Root runner (npm run dev)
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher; v24 recommended)
- `npm`

### 1. Install Dependencies
Run the following from the root directory:
```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2. Start Development (Both Frontend & Backend)
Run from the root directory:
```bash
npm run dev
```

This launches both servers concurrently:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000) (Health check: `/api/health`)

---

## Free Cloud Hosting Guide (100% Free Forever)

### 1. Database: MongoDB Atlas Free Shared Cluster (Free Forever)
1. Sign up on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create an **M0 Free (Shared)** cluster.
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
5. Copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/resumecraft?retryWrites=true&w=majority
   ```
6. Add it as `MONGODB_URI` in `backend/.env` or in Render's environment variables.

### 2. Backend Hosting: Render.com (Free Web Service)
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render.com](https://render.com/).
3. Set the Root Directory to `backend`, Build Command to `npm install`, and Start Command to `npm start`.
4. Add your Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<your-mongodb-atlas-uri>`
   - `JWT_SECRET`: `<any-secure-random-string>`
   - `GEMINI_API_KEY`: `<your-gemini-api-key>` (optional)
   - `FRONTEND_URL`: `<your-frontend-url>`
5. Click **Deploy**.

### 3. Frontend Hosting: Vercel or Netlify (Free Static Hosting)
1. Import your repository into [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
2. Set Root Directory to `frontend`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Deploy!

---

## License

This project is licensed under the [MIT License](LICENSE).
