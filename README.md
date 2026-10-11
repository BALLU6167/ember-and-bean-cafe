# Ember & Bean — Artisanal Roastery & Kitchen

An ultra-premium, cinematic, high-performance web experience for **Ember & Bean Artisanal Roastery & Kitchen** (Jubilee Hills, Hyderabad). Built with React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, and hardware-accelerated scrollytelling canvas animations.

---

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or the port indicated in your terminal.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel via GitHub

1. **Upload / Push this project to GitHub:**
   - Create a new repository on [GitHub](https://github.com/new).
   - Push all project files (the `.gitignore` is already set up to exclude `node_modules` and build output).

2. **Import into Vercel:**
   - Go to [Vercel](https://vercel.com) and click **"Add New..." → "Project"**.
   - Select your GitHub repository.
   - Vercel will automatically detect **Vite** as the framework preset (`vercel.json` is already included).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **"Deploy"**.

3. **Your site is now live!**

---

## 📁 Project Structure

```
├── public/                 # Static assets (video reels, animation frames, icons)
│   ├── frames/             # Scrollytelling image sequence frames
│   └── videos/             # Looping Instagram reels (zen_v_cafe_reel.mp4)
├── src/
│   ├── components/         # Reusable UI components & layouts
│   │   ├── hero/           # Cinematic Hero section
│   │   ├── layout/         # Navbar, Footer
│   │   ├── offer/          # Release Offer modal & top banner (Passkey 7075)
│   │   ├── scrollytelling/ # Canvas frame sequence renderer
│   │   └── ...
│   ├── context/            # Global context (LanguageContext, OfferContext)
│   ├── data/               # Cafe menu data, testimonials, faq data
│   ├── pages/              # Multi-page views (HomePage, MenuPage, ViewCafe, Workspace, Story)
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility helpers & translations
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Tailwind CSS base styles & mobile stability
│   └── main.tsx            # React DOM entry point
├── index.html              # HTML shell & mobile viewport configuration
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind theme configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel SPA routing & Vite framework preset
└── vite.config.ts          # Vite build configuration
```
