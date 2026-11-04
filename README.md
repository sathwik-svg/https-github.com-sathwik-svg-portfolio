# Sathwik Ganji — Cloud & DevOps Portfolio (React + TypeScript)

Personal portfolio web application for **Sathwik Ganji**, Computer Science and Engineering student at Vasireddy Venkatadri International Technological University (VVITU) focused on **Cloud Computing, DevOps, Software Engineering, Linux, AWS, Docker, Kubernetes, Terraform, and CI/CD**.

Rewritten as a modern React single-page application (SPA) with TypeScript, Vite, and Tailwind CSS.

## 🚀 Key Features

* **Home:** Introduction, animated blob portrait, quick actions, and verified Credly badges link.
* **About:** Background at VVITU, career goals (Cloud / DevOps Engineer → Cloud Solutions Architect), floating portrait with orbital rings, and interactive technology badges.
* **Projects & Engineering Solutions:**
  * **Featured Cloud & DevOps Projects:** Deep-dive cards for Project 16 (Monitoring), Project 15 (AWS CI/CD), Project 14 (Terraform IaC), Project 13 (Kubernetes CI/CD), Project 12 (Kubernetes Production), and Serverless Lambda.
  * **Architecture Modal:** ASCII architecture diagrams, technology stack, engineering focus, and live demo/repo links.
  * **Live GitHub Catalog:** Real-time repository loader querying GitHub API with multi-category filters (Cloud, DevOps, Kubernetes, Terraform, Docker, B.Tech, AI/ML) and graceful offline fallback.
  * **Engineering & Troubleshooting Cases:** Real-world incident resolution case studies (AI Agent Timeout, Kubernetes Manifest Validation, Docker Compose Multi-Service, Service Availability).
* **Operating Systems:** Systems administration knowledge base and diagnostics reference across Windows, Linux (Ubuntu Server), and macOS.
* **Resume:** Embedded PDF preview, one-click PDF download, and career target summary.
* **Contact:** Direct channels (Email, LinkedIn, Location, GitHub) and interactive message form with instant validation.
* **Portfolio AI Assistant:** Floating chat widget connected to Sathwik's webhook with intelligent offline portfolio knowledge base.
* **Theme Engine:** Dark and light theme switcher with persistent storage.

## 🛠️ Tech Stack

* **Framework:** React 19 + TypeScript
* **Bundler & Dev Server:** Vite 6
* **Styling:** Tailwind CSS v4 + Custom Theme Variables & Animations
* **Routing:** React Router v7
* **Icons:** Lucide React & Custom Brand SVG Components

## 💻 Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application runs on `http://0.0.0.0:3000`.

Build for production:

```bash
npm run build
```

Lint TypeScript codebase:

```bash
npm run lint
```

## 🌐 Render Deployment (`render.yaml`)

This repository is configured for automated deployment on [Render](https://render.com).

* **Runtime:** Node.js Web Service
* **Build Command:** `npm install && npm run build`
* **Start Command:** `npm start` (runs `tsx server.ts`)
* **Environment Variables:**
  * `NODE_ENV`: `production`
  * `PORT`: Automatically assigned by Render (default fallback `3000`)
  * `GEMINI_API_KEY`: *(Optional)* Sathwik AI Assistant Gemini API key. If omitted, the assistant seamlessly runs the embedded local knowledge engine!

### Deploying to Render:
1. Push your latest commits to GitHub:
   ```bash
   git add .
   git commit -m "Configure Render deployment and full-stack portfolio features"
   git push origin main
   ```
2. Render detects the push and uses `render.yaml` to build and serve the application automatically at `https://portfolio-wuht.onrender.com`.

## 📬 Contact

* **Name:** Sathwik Ganji
* **Email:** [ganjisathwik73@gmail.com](mailto:ganjisathwik73@gmail.com)
* **Phone:** +91 9440547665
* **GitHub:** [https://github.com/sathwik-svg](https://github.com/sathwik-svg)
* **LinkedIn:** [https://www.linkedin.com/in/sathwik-svg/](https://www.linkedin.com/in/sathwik-svg/)
* **Credly Badges:** [https://www.credly.com/users/sathwik-ganji](https://www.credly.com/users/sathwik-ganji)
