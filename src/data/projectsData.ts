import { ProjectDetail, TroubleshootingCase } from '../types';

export const featuredProjects: ProjectDetail[] = [
  {
    id: 'monitoring',
    number: 'PROJECT 16',
    kicker: 'PROJECT 16 · PRODUCTION OPERATIONS',
    title: 'Production Monitoring Dashboard',
    description:
      'Production-style monitoring dashboard designed to provide operational visibility, service health information and engineering-focused monitoring capabilities.',
    tech: 'Monitoring · Linux · Health Checks · Web Services',
    focus: 'Observability and operational reliability',
    architecture: `APPLICATION
      ↓
HEALTH ENDPOINT
      ↓
MONITORING DASHBOARD
      ↓
SERVICE STATUS
      ↓
OPERATIONAL VISIBILITY`,
    github: 'https://github.com/sathwik-svg/project-16-production-monitoring-dashboard',
    demo: 'https://project-16-production-monitoring.ganjisathwik73.workers.dev/'
  },
  {
    id: 'aws-cicd',
    number: 'PROJECT 15',
    kicker: 'PROJECT 15 · AWS / CI/CD',
    title: 'Advanced AWS CI/CD',
    description:
      'Advanced CI/CD project demonstrating automated validation, deployment workflows and cloud-oriented engineering practices.',
    tech: 'AWS · GitHub Actions · CI/CD · Docker',
    focus: 'Automated software delivery',
    architecture: `GIT PUSH
   ↓
GITHUB ACTIONS
   ↓
VALIDATION
   ↓
BUILD / PACKAGE
   ↓
DEPLOYMENT
   ↓
APPLICATION`,
    github: 'https://github.com/sathwik-svg/project-15-advanced-aws-cicd',
    demo: 'https://project-15-advanced-aws-cicd.ganjisathwik73.workers.dev/'
  },
  {
    id: 'terraform',
    number: 'PROJECT 14',
    kicker: 'PROJECT 14 · INFRASTRUCTURE AS CODE',
    title: 'Terraform AWS Infrastructure',
    description:
      'Infrastructure-as-Code project focused on defining reproducible infrastructure using Terraform configuration.',
    tech: 'Terraform · HCL · AWS · IaC',
    focus: 'Repeatable infrastructure automation',
    architecture: `TERRAFORM CONFIG
       ↓
PLAN
       ↓
VALIDATE
       ↓
APPLY
       ↓
CLOUD INFRASTRUCTURE`,
    github: 'https://github.com/sathwik-svg/project-14-terraform-aws-infrastructure'
  },
  {
    id: 'kubernetes',
    number: 'PROJECT 13',
    kicker: 'PROJECT 13 · KUBERNETES CI/CD',
    title: 'AWS Kubernetes CI/CD',
    description:
      'Kubernetes and CI/CD project combining containerization, automated validation and cloud deployment concepts.',
    tech: 'Kubernetes · Docker · GitHub Actions · AWS',
    focus: 'Container orchestration and automated delivery',
    architecture: `GITHUB
   ↓
GITHUB ACTIONS
   ↓
DOCKER IMAGE
   ↓
KUBERNETES
   ↓
SERVICE
   ↓
APPLICATION`,
    github: 'https://github.com/sathwik-svg/project-13-aws-kubernetes-cicd'
  },
  {
    id: 'k8s-production',
    number: 'PROJECT 12',
    kicker: 'PROJECT 12 · PRODUCTION KUBERNETES',
    title: 'Kubernetes Production Application',
    description:
      'Production-style Kubernetes application architecture using application containers, PostgreSQL, Redis, configuration, secrets and persistent storage.',
    tech: 'Kubernetes · Docker · PostgreSQL · Redis',
    focus: 'Container orchestration and stateful services',
    architecture: `INGRESS / SERVICE
       ↓
APPLICATION PODS
       ↓
POSTGRESQL + REDIS
       ↓
PERSISTENT STORAGE`,
    github: 'https://github.com/sathwik-svg/project-12-kubernetes-production'
  },
  {
    id: 'lambda',
    number: 'CLOUD',
    kicker: 'AWS SERVERLESS',
    title: 'AWS Serverless Lambda',
    description:
      'Python-based serverless application designed around AWS Lambda and API Gateway concepts.',
    tech: 'AWS Lambda · API Gateway · Python',
    focus: 'Serverless application architecture',
    architecture: `CLIENT
  ↓
API GATEWAY
  ↓
AWS LAMBDA
  ↓
PYTHON LOGIC
  ↓
RESPONSE`,
    github: 'https://github.com/sathwik-svg/aws-serverless-lambda'
  }
];

export const troubleshootingCases: TroubleshootingCase[] = [
  {
    id: 'ai-troubleshooting',
    label: 'Cloud / AI Infrastructure',
    title: 'AI Agent Timeout → Direct Ollama API',
    description:
      'An AI workflow was taking too long and repeatedly terminating. The execution path was simplified by moving from the problematic agent flow to a direct HTTP request against the local Ollama API. The new workflow was validated locally and through the public Cloudflare endpoint.',
    flow: ['n8n', 'Ollama', 'Gemma', 'HTTP API', 'Cloudflare'],
    tech: 'n8n · Ollama · Gemma · HTTP API · Cloudflare',
    focus: 'Failure isolation and architecture simplification',
    architecture: `VISITOR
  ↓
RENDER PORTFOLIO
  ↓
CLOUDFLARE TUNNEL
  ↓
n8n WEBHOOK
  ↓
HTTP REQUEST
  ↓
OLLAMA / GEMMA
  ↓
RESPONSE`
  },
  {
    id: 'k8s-troubleshooting',
    label: 'Kubernetes',
    title: 'CI/CD Validation & Kubernetes Manifests',
    description:
      'Investigated CI/CD validation output, Kubernetes manifests and workflow configuration to identify deployment and validation issues, then verified the corrected pipeline through GitHub Actions.',
    flow: ['GitHub Actions', 'Kubernetes', 'YAML', 'CI/CD'],
    tech: 'GitHub Actions · Kubernetes · YAML · Docker',
    focus: 'CI/CD debugging and manifest validation',
    architecture: `GIT COMMIT
   ↓
GITHUB ACTIONS
   ↓
MANIFEST VALIDATION
   ↓
IMAGE / DEPLOYMENT
   ↓
KUBERNETES`
  },
  {
    id: 'docker-troubleshooting',
    label: 'Containers',
    title: 'Docker Compose Multi-Service Troubleshooting',
    description:
      'Diagnosed multi-container environments involving application services, databases, networking and persistent configuration.',
    flow: ['Docker', 'Compose', 'PostgreSQL', 'Networking'],
    tech: 'Docker · Compose · PostgreSQL · Networking',
    focus: 'Container networking and service dependencies',
    architecture: `APP CONTAINER
      ↓
DOCKER NETWORK
   ↙        ↘
DATABASE    SERVICE
      ↓
PERSISTENT DATA`
  },
  {
    id: 'monitoring-troubleshooting',
    label: 'Production Operations',
    title: 'Service Availability & Monitoring',
    description:
      'Built and validated production-style monitoring workflows focused on health endpoints, service availability and operational visibility.',
    flow: ['Monitoring', 'Health Checks', 'Linux', 'DevOps'],
    tech: 'Monitoring · Health Checks · Linux · DevOps',
    focus: 'Observability and operational reliability',
    architecture: `APPLICATION
      ↓
HEALTH ENDPOINT
      ↓
MONITORING DASHBOARD
      ↓
SERVICE STATUS
      ↓
OPERATIONAL VISIBILITY`
  }
];
