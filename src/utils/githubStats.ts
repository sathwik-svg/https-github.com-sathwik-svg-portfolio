import { LanguageItem, RepoSummaryStats } from '../types';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  HCL: '#844FBA',
  Terraform: '#844FBA',
  Dockerfile: '#384d54',
  Shell: '#89e051',
  Bash: '#89e051',
  Go: '#00ADD8',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Rust: '#dea584',
  YAML: '#cb171e',
  Makefile: '#427819',
  Markdown: '#083fa1'
};

export function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || '#38bdf8';
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Recent';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recent';

    // Format: e.g. "Oct 24, 2024"
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recent';
  }
}

// In-memory cache for repository language stats
const languageCache = new Map<string, LanguageItem[]>();

// Known project fallback breakdowns based on actual project contents
const KNOWN_PROJECT_LANGUAGES: Record<string, Record<string, number>> = {
  'project-16-production-monitoring-dashboard': {
    TypeScript: 55,
    CSS: 30,
    HTML: 15
  },
  'project-15-advanced-aws-cicd': {
    HTML: 48,
    CSS: 45,
    JavaScript: 5,
    Dockerfile: 2
  },
  'project-14-terraform-aws-infrastructure': {
    HCL: 85,
    Shell: 10,
    Dockerfile: 5
  },
  'project-13-aws-kubernetes-cicd': {
    YAML: 60,
    Shell: 25,
    Dockerfile: 15
  },
  'project-12-kubernetes-production': {
    YAML: 65,
    Shell: 20,
    Dockerfile: 15
  },
  'aws-serverless-lambda': {
    Python: 80,
    YAML: 15,
    Shell: 5
  },
  portfolio: {
    TypeScript: 68,
    CSS: 22,
    HTML: 10
  }
};

export async function fetchRepoLanguages(repoName: string, fallbackLanguage?: string | null): Promise<LanguageItem[]> {
  // Check memory cache
  if (languageCache.has(repoName)) {
    return languageCache.get(repoName)!;
  }

  // Check sessionStorage
  try {
    const cached = sessionStorage.getItem(`gh_lang_${repoName}`);
    if (cached) {
      const parsed: LanguageItem[] = JSON.parse(cached);
      languageCache.set(repoName, parsed);
      return parsed;
    }
  } catch {
    // ignore storage error
  }

  try {
    const res = await fetch(`https://api.github.com/repos/sathwik-svg/${repoName}/languages`);
    if (res.ok) {
      const data: Record<string, number> = await res.json();
      const totalBytes = Object.values(data).reduce((acc, bytes) => acc + bytes, 0);

      if (totalBytes > 0) {
        const languages: LanguageItem[] = Object.entries(data).map(([name, bytes]) => {
          const rawPercentage = (bytes / totalBytes) * 100;
          return {
            name,
            bytes,
            percentage: rawPercentage < 1 ? Math.round(rawPercentage * 10) / 10 : Math.round(rawPercentage),
            color: getLanguageColor(name)
          };
        });

        // Sort descending by percentage
        languages.sort((a, b) => b.bytes - a.bytes);

        languageCache.set(repoName, languages);
        try {
          sessionStorage.setItem(`gh_lang_${repoName}`, JSON.stringify(languages));
        } catch {
          // ignore storage error
        }
        return languages;
      }
    }
  } catch {
    // API failed or rate-limited, fall through to fallback
  }

  // Fallback if known project
  if (KNOWN_PROJECT_LANGUAGES[repoName]) {
    const known = KNOWN_PROJECT_LANGUAGES[repoName];
    const items: LanguageItem[] = Object.entries(known).map(([name, pct]) => ({
      name,
      bytes: pct * 100,
      percentage: pct,
      color: getLanguageColor(name)
    }));
    languageCache.set(repoName, items);
    return items;
  }

  // Fallback to primary language if available
  if (fallbackLanguage) {
    const single: LanguageItem[] = [
      {
        name: fallbackLanguage,
        bytes: 100,
        percentage: 100,
        color: getLanguageColor(fallbackLanguage)
      }
    ];
    languageCache.set(repoName, single);
    return single;
  }

  return [];
}

export function extractRepoNameFromUrl(githubUrl?: string): string | null {
  if (!githubUrl) return null;
  const parts = githubUrl.split('/');
  return parts[parts.length - 1] || null;
}

const readmeCache = new Map<string, string>();

export async function fetchRepoReadme(repoName: string): Promise<string> {
  // Check memory cache
  if (readmeCache.has(repoName)) {
    return readmeCache.get(repoName)!;
  }

  // Check sessionStorage
  try {
    const cached = sessionStorage.getItem(`gh_readme_${repoName}`);
    if (cached) {
      readmeCache.set(repoName, cached);
      return cached;
    }
  } catch {
    // ignore
  }

  // 1. Try official GitHub API raw readme endpoint
  try {
    const res = await fetch(`https://api.github.com/repos/sathwik-svg/${repoName}/readme`, {
      headers: {
        Accept: 'application/vnd.github.v3.raw'
      }
    });

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim()) {
        readmeCache.set(repoName, text);
        try {
          sessionStorage.setItem(`gh_readme_${repoName}`, text);
        } catch {
          // ignore
        }
        return text;
      }
    }
  } catch {
    // fallback to raw.githubusercontent.com
  }

  // 2. Try raw.githubusercontent.com for main branch
  try {
    const res = await fetch(`https://raw.githubusercontent.com/sathwik-svg/${repoName}/main/README.md`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim()) {
        readmeCache.set(repoName, text);
        try {
          sessionStorage.setItem(`gh_readme_${repoName}`, text);
        } catch {
          // ignore
        }
        return text;
      }
    }
  } catch {
    // fallback to master
  }

  // 3. Try raw.githubusercontent.com for master branch
  try {
    const res = await fetch(`https://raw.githubusercontent.com/sathwik-svg/${repoName}/master/README.md`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim()) {
        readmeCache.set(repoName, text);
        try {
          sessionStorage.setItem(`gh_readme_${repoName}`, text);
        } catch {
          // ignore
        }
        return text;
      }
    }
  } catch {
    // ignore
  }

  throw new Error(`README.md not found or unavailable for ${repoName}`);
}
