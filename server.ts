import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header if API key exists
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

const SYSTEM_INSTRUCTION = `
You are the official Portfolio AI Assistant for Sathwik Ganji. Your mission is to explain Sathwik's profile, achievements, cloud/DevOps projects, and showcase his problem-solving and communication skills to recruiters, hiring managers, and engineers.

PROFILE SUMMARY:
- Name: Sathwik Ganji
- Education: B.Tech in Computer Science & Engineering at Vasireddy Venkatadri Institute of Technology (VVIT), Andhra Pradesh, India.
- Focus: Cloud Computing, DevOps, Software Engineering, Linux administration, AWS, Docker, Kubernetes, Terraform, and CI/CD automation.
- Career Goal: Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE), and long-term Cloud Solutions Architect.
- Email: ganjisathwik73@gmail.com
- Phone: +91 9440547665
- GitHub: https://github.com/sathwik-svg
- LinkedIn: https://www.linkedin.com/in/sathwik-svg/
- Verified Credly Badges: https://www.credly.com/users/sathwik-ganji

KEY ACHIEVEMENTS:
1. Verified AWS & Cloud Credentials on Credly confirming foundational and practical cloud skills.
2. Built Project 16 (Production Monitoring Dashboard): End-to-end service observability, health probes, and uptime visibility.
3. Built Project 15 (Advanced AWS CI/CD): Production-style deployment pipeline with Docker containerization, automated validation, and cloud delivery.
4. Built Project 14 (Terraform AWS Infrastructure): Infrastructure-as-Code (IaC) configuration ensuring repeatable, drift-free cloud provisioning.
5. Built Project 13 (AWS Kubernetes CI/CD): Combined containerization, automated manifest validation, and cloud delivery.
6. Built Project 12 (Kubernetes Production Application): Multi-service container orchestration with PostgreSQL, Redis, ConfigMaps, Secrets, and Persistent Volumes.
7. Built Serverless Python Lambda with AWS API Gateway.

PROBLEM-SOLVING SKILLS TO HIGHLIGHT:
- Systematic Root-Cause Analysis: Instead of superficial fixes, isolates bottlenecks (e.g. diagnosing an AI workflow timeout and re-architecting it to a direct HTTP request to Ollama; resolving Kubernetes CI/CD manifest validation errors; untangling Docker Compose network dependencies).
- Infrastructure as Code (IaC): Eliminates configuration drift and human errors through reproducible Terraform and Kubernetes YAML manifests.
- Observability-First Mindset: Implements proactive health checks, Prometheus metrics, and automated logging so issues are caught before users notice.

COMMUNICATION & COLLABORATION SKILLS TO HIGHLIGHT:
- Architectural Documentation: Creates crisp ASCII workflow diagrams, structured READMEs, and technical case studies to make distributed systems transparent.
- Cross-Functional Enablement: Automates build and test pipelines so software developers can deploy code without infrastructure friction.
- Transparent Engineering: Writes incident case studies with clear breakdown of Problem, Investigation, Architecture Simplification, and Resolution.

TONE & STYLE:
- Professional, confident, articulate, and technically precise.
- Use bold highlights, structured bullet points, and concise explanations.
- Speak warmly about Sathwik in the third person or as his portfolio assistant.
`;

// Fallback response generator if GEMINI_API_KEY is not set
function generateKnowledgeResponse(userMessage: string): string {
  const q = userMessage.toLowerCase();

  if (q.includes('achievement') || q.includes('credential') || q.includes('badge') || q.includes('credly')) {
    return `### 🏆 Sathwik's Key Achievements & Credentials

1. **Verified AWS & Cloud Credly Badges**: Sathwik holds verified cloud learning credentials from AWS on Credly ([credly.com/users/sathwik-ganji](https://www.credly.com/users/sathwik-ganji)).
2. **Flagship Cloud & DevOps Projects**:
   - **Project 16 (Production Monitoring Dashboard)**: Live health checks, Linux service probes, and real-time observability.
   - **Project 15 (Advanced AWS CI/CD)**: Complete automated build, test, and containerized deployment with Docker & GitHub Actions.
   - **Project 14 (Terraform AWS Infrastructure)**: Reproducible Infrastructure as Code (IaC) provisioning.
   - **Project 13 & 12 (Kubernetes CI/CD & Production Orchestration)**: Stateful microservices with PostgreSQL & Redis.
3. **Academic Background**: Pursuing B.Tech in Computer Science & Engineering at Vasireddy Venkatadri Institute of Technology (VVIT).`;
  }

  if (q.includes('problem') || q.includes('solving') || q.includes('debug') || q.includes('troubleshoot')) {
    return `### 🧩 Sathwik's Problem-Solving Methodology

Sathwik approaches engineering problems with a structured, root-cause methodology:

- **Failure Isolation over Guesswork**: In his AI Infrastructure case, an agent workflow was timing out. Sathwik isolated the bottleneck, bypassed the bloated agent layer, and routed requests directly to the Ollama HTTP API via Cloudflare tunnels, achieving 100% reliability.
- **Manifest Validation & Pipeline Debugging**: In his Kubernetes CI/CD case, he diagnosed workflow YAML schema validation issues and fixed automated deployment gates.
- **Dependency & State Management**: In Docker Compose multi-service troubleshooting, he solved persistent volumes and network isolation for application services and PostgreSQL databases.
- **Infrastructure as Code**: Solves environment drift across dev/staging/prod by declaring infrastructure in Terraform.`;
  }

  if (q.includes('communication') || q.includes('collaborat') || q.includes('team') || q.includes('document')) {
    return `### 🗣️ Sathwik's Communication & Collaboration Skills

Engineering is as much about clear communication as it is about writing code:

- **Architectural Documentation**: Sathwik documents every system using visual ASCII architecture pipelines and detailed READMEs so any team member can onboard in minutes.
- **Cross-Team Alignment**: He builds CI/CD pipelines and containerized Docker environments to eliminate the "works on my machine" friction between developers and operations.
- **Incident Post-Mortems**: Every troubleshooting case is documented with clear sections: Problem Statement, Root-Cause Analysis, Architectural Redesign, and Verification.
- **Active Engagement**: Open and responsive communicator across Email, LinkedIn, GitHub, and WhatsApp.`;
  }

  if (q.includes('hire') || q.includes('why') || q.includes('fit') || q.includes('role')) {
    return `### 💼 Why Hire Sathwik Ganji?

- **Practical Cloud & DevOps Mastery**: Real hands-on experience with AWS, Kubernetes, Terraform, Docker, and GitHub Actions.
- **Production-Ready Mindset**: Focuses on reliability, observability, automated tests, and reproducible IaC rather than manual hacks.
- **Rapid Learner & Strong Communicator**: Demonstrates his work transparently with live demos, public repositories, and verified AWS badges.
- **Target Roles**: Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE), or Software Engineer.`;
  }

  return `### 🤖 Sathwik Ganji — Profile Overview

Sathwik is a **Cloud & DevOps Engineer** and Computer Science student at **Vasireddy Venkatadri Institute of Technology (VVIT)**.

- **Core Stack**: AWS, Docker, Kubernetes, Terraform, Linux (Ubuntu), GitHub Actions CI/CD, Python, and Prometheus/Grafana.
- **Track Record**: 16+ engineering projects, production CI/CD pipelines, and verified AWS credentials on Credly.
- **Differentiators**: Strong problem-solving methodology, proactive observability, and transparent architectural documentation.

Feel free to ask me to explain his **achievements**, **problem-solving case studies**, **communication approach**, or **specific projects**!`;
}

// AI Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message string is required' });
  }

  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION
        }
      });

      const reply = response.text || generateKnowledgeResponse(message);
      return res.json({ reply, source: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.warn('Gemini API query error, falling back to knowledge engine:', err.message);
      const fallbackReply = generateKnowledgeResponse(message);
      return res.json({ reply: fallbackReply, source: 'knowledge-engine' });
    }
  }

  // Fallback to local intelligent knowledge engine
  const reply = generateKnowledgeResponse(message);
  return res.json({ reply, source: 'knowledge-engine' });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
