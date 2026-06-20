# AI Resume Bullet Enhancer

A complete Next.js web application that transforms weak resume bullet points into stronger ATS-friendly achievements without paid APIs or external AI services.

## Features

- Resume bullet enhancer with rule-based rewriting
- ATS score from 0 to 100
- Weak word detector for terms like `made`, `did`, `worked on`, `helped`, and `used`
- Action verb suggestions
- Internship role optimization for:
  - Software Engineer
  - AI/ML Engineer
  - Data Analyst
  - Frontend Developer
  - Backend Developer
- Copy-to-clipboard output
- Example before-and-after bullets
- Responsive SaaS-style design with dark mode
- Vercel free plan compatible

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Vercel Deployment

1. Push this project to a GitHub repository.
2. Go to Vercel and choose `Add New Project`.
3. Import the repository.
4. Keep the default framework preset as `Next.js`.
5. Use these defaults:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Click `Deploy`.

No environment variables are required because the app uses local rule-based logic instead of paid APIs.

## Customization

The footer currently shows:

- Full Name: Amrita Pandey
- Email: amritapandey3210@gmail.com

Update the email text in `src/components/Footer.tsx` if your contact email changes.

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    ExampleSection.tsx
    FeatureGrid.tsx
    Footer.tsx
    ResumeEnhancer.tsx
    ScoreGauge.tsx
  lib/
    resumeEnhancer.ts
```
