# BuildStream: Construction Field Management 🚧

A complete, responsive Construction Field Management web application built with React, Vite, and Tailwind CSS. The platform enables site managers to log in, view their projects, and submit Daily Progress Reports (DPR).

## 🚀 Built With
- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS (Vanilla configuration with dark mode support)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Animations:** Framer Motion (Page Transitions & Micro-interactions)
- **State Management:** React Context API (AuthContext, ThemeContext)
- **Utilities:** clsx, tailwind-merge (for dynamic class merging)

## ✨ Features
1. **Mock Authentication System:** Use `test@test.com` and `123456` to securely login. Includes full validation and loading states.
2. **Project Dashboard:** A smooth layout showcasing all active projects with search capability and status filtering. Projects feature dynamic progress bars.
3. **Daily Progress Report (DPR) Form:** 
    - Full project selection capability
    - Dynamic photo upload with live preview thumbnails (max 3 photos)
    - Full client-side validation for all fields (Date, Weather, Description, Workers, etc.)
4. **Dark Mode Support:** A rich, carefully curated Dark Mode palette using Tailwind's `class` strategy with user preference persistence (saved to `localStorage`).
5. **Framer Motion Animations:** Smooth page transitions across routes, list staggers, and form success toasts for a highly premium, fluid experience.
6. **Mobile-First Responsive Design:** Optimized from 375px upwards to widescreen desktop, ensuring completely zero horizontal scrolling and flawless layout scaling.

## 📦 Local Setup Instructions

Follow these steps to clone and run the application locally:

### 1. Install Dependencies
Ensure you have Node.js installed (v16+ recommended).
Navigate into the root folder of this project, and run:
```bash
npm install
```

### 2. Run the Development Server
Once dependencies are installed, spin up the extremely fast Vite dev server:
```bash
npm run dev
```

### 3. Build for Production
To generate a production-ready build:
```bash
npm run build
```

The compiled assets will be available inside the `/dist` directory.

## 🏗️ Project Structure
- `/src/components/*` - Reusable UI elements (Buttons, Inputs, Cards)
- `/src/pages/*` - Main routable pages (Login, ProjectList, DPRForm)
- `/src/contexts/*` - Global state context files
- `/src/utils/*` - Mock data and helper utility functions

## ⚠️ Known Limitations
- The authentication is entirely mocked within the Context API. No real session is managed server-side.
- The photo upload system stores images via `URL.createObjectURL()`, which is ephemeral and does not persist across reloads.
- No real database integration—project changes or new DPRs will not persist upon application restart. 

*Designed dynamically with seamless interactions and modern aesthetics.*
