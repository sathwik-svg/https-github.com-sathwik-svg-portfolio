export interface LanguageItem {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
}

export interface RepoSummaryStats {
  stars: number;
  lastUpdated: string;
  rawDate?: string;
  languages: LanguageItem[];
  isLoading?: boolean;
}

export interface ProjectDetail {
  id: string;
  number?: string;
  kicker: string;
  title: string;
  description: string;
  tech: string;
  focus: string;
  architecture: string;
  github?: string;
  demo?: string;
  stats?: RepoSummaryStats;
}

export interface TroubleshootingCase {
  id: string;
  label: string;
  title: string;
  description: string;
  flow: string[];
  tech: string;
  focus: string;
  architecture: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  pushed_at?: string;
  fork: boolean;
  topics?: string[];
  stats?: RepoSummaryStats;
}

export type ProjectFilter =
  | 'all'
  | 'cloud'
  | 'devops'
  | 'kubernetes'
  | 'terraform'
  | 'docker'
  | 'academic'
  | 'ai';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}
