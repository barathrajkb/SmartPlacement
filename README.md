# SmartPlacement

SmartPlacement is an AI-assisted career intelligence platform for students and early-career engineers preparing for technical placements and product-company interviews.

It combines onboarding-driven personalization, progress analytics, mock interview simulation, company-focused prep, resume optimization, scheduling, and peer collaboration into one dashboard.

## Why This Project

Interview prep tools are often fragmented across spreadsheets, random docs, and standalone coding websites. SmartPlacement centralizes the workflow by helping users:

- Build a personalized preparation plan
- Track readiness and topic coverage
- Practice interview formats
- Optimize resume quality and ATS match
- Follow application timelines
- Collaborate with a community of peers

## Core Features

### Authentication and User Profiles

- Email/password authentication via Firebase Auth
- Protected routes for authenticated users
- User profile persistence in Firestore
- Real-time sync of user data with Firestore snapshots

### Personalized Onboarding

- Multi-step onboarding flow for:
- Profile details (name, college, graduation year, language)
- Skill baseline assessment
- Domain interests
- Target company selection
- Prep preferences (timeline, daily effort, interview focus)

### Main Product Modules

- Dashboard
- Readiness gauge and XP-style progress indicators
- Personalized daily focus tasks
- AI coaching nudges and upcoming deadlines

- Roadmap
- Domain-aware weekly preparation plan
- Progress tracking across tasks and sessions
- Confidence and topic status side panel

- Company Intelligence
- Target-company cards with match scores and prep signals
- Role filters and sorting controls
- Concept tags and interview pattern summaries

- Mock Interview
- 3-panel practice interface (context, answer workspace, live feedback)
- Simulated scoring and AI feedback modal

- Analytics
- Readiness trend chart
- Skill radar visualization
- Practice heatmap
- Cohort standing and time-investment breakdown

- Collaborate (The Hive)
- Company-specific discussion hubs
- Study groups and posting composer
- Thread detail pages for forum conversations

- Resume Builder
- Section-based resume editor
- AI enhancement triggers for selected sections
- ATS-style score and optimization suggestions

- Career Coach
- Chat-style AI coaching experience with suggested prompts
- Session history panel and quick actions

- Resource Library
- Search, category filtering, sorting, bookmarks
- Grid/list browsing for curated learning resources

- Scheduler
- Interview calendar, event markers, and scheduling controls
- Application pipeline and upcoming session cards

- Settings
- Profile update and persistence to Firestore
- Notification toggles and preference sections

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Routing: React Router
- Styling: Tailwind CSS + custom design tokens
- Auth and database: Firebase Auth + Firestore
- Utilities: clsx, tailwind-merge
- Linting: ESLint

## Project Structure

```
src/
  components/
    layout/
      AppShell.tsx
      Header.tsx
      Sidebar.tsx
    ProtectedRoute.tsx
  contexts/
    AuthContext.tsx
  pages/
    Analytics.tsx
    AuthPage.tsx
    CareerCoach.tsx
    Collaborate.tsx
    CompanyIntelligence.tsx
    Dashboard.tsx
    ForumThread.tsx
    MockInterview.tsx
    Onboarding.tsx
    Resources.tsx
    ResumeBuilder.tsx
    Roadmap.tsx
    Scheduler.tsx
    Settings.tsx
  App.tsx
  firebase.ts
  index.css
  main.tsx
```

## Routing Map

- Public route
- /auth

- Protected routes
- /dashboard
- /onboarding
- /companies
- /roadmap
- /mock-interview
- /analytics
- /collaborate
- /forum/:id
- /resume
- /coach
- /resources
- /scheduler
- /settings

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository

```bash
git clone <your-repository-url>
cd SmartPlacement
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open the app in your browser

```text
http://localhost:5173
```

## Firebase Setup

This project currently initializes Firebase directly in source code.

Current integration:

- Firebase app initialization in `src/firebase.ts`
- Auth state management in `src/contexts/AuthContext.tsx`
- User profile reads/writes in onboarding and settings modules

## Current Status and Scope

SmartPlacement is a strong UI-first product prototype with real authentication and profile persistence.

Implemented with backend persistence:

- Authentication (Firebase Auth)
- Firestore user profile data read/write

Currently simulated in frontend state (can be connected to backend services next):

- AI chat responses and AI scoring
- Some analytics and readiness projections
- Several scheduling and collaboration interactions
- Some resource and resume enhancement actions

## Author
### Barath Raj KB
### Bhuvishaa Sri MA
Built for HackFest by the SmartPlacement team.
