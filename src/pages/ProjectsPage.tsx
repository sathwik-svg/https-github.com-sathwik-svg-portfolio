import React, { useState, useEffect, useMemo } from 'react';
import { featuredProjects, troubleshootingCases } from '../data/projectsData';
import { ProjectDetail, GitHubRepo, RepoSummaryStats } from '../types';
import { ExternalLink, Terminal, RefreshCw, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { ProjectStatsSection } from '../components/ProjectStatsSection';
import {
  ProjectFilterComponent,
  ProjectTypeFilter,
  TechStackFilter,
  SortByOption
} from '../components/ProjectFilterComponent';
import {
  formatDate,
  fetchRepoLanguages,
  extractRepoNameFromUrl
} from '../utils/githubStats';
import { TiltCard } from '../components/TiltCard';

interface ProjectsPageProps {
  onSelectProject: (proj: ProjectDetail) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<boolean>(false);
  const [statsMap, setStatsMap] = useState<Record<string, RepoSummaryStats>>({});

  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<ProjectTypeFilter>('all');
  const [selectedTech, setSelectedTech] = useState<TechStackFilter>('all');
  const [selectedSort, setSelectedSort] = useState<SortByOption>('recent');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedTech('all');
    setSelectedSort('recent');
  };

  const classifyRepo = (repo: GitHubRepo): ProjectTypeFilter => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const topics = (repo.topics || []).join(' ').toLowerCase();
    const text = `${name} ${desc} ${topics}`;

    if (text.includes('monitoring') || text.includes('observability')) return 'monitoring';
    if (text.includes('kubernetes') || text.includes('helm')) return 'kubernetes';
    if (text.includes('terraform') || text.includes('infrastructure')) return 'terraform';
    if (text.includes('docker') || text.includes('compose')) return 'docker';
    if (text.includes('aws') || text.includes('lambda') || text.includes('s3') || text.includes('cloud')) return 'cloud';
    if (text.includes('cicd') || text.includes('ci-cd') || text.includes('github-actions') || text.includes('devops') || text.includes('deploy')) return 'devops';
    if (name.startsWith('s1-') || name.startsWith('s2-') || name.startsWith('s3-') || name.startsWith('s4-') || name.startsWith('s5-') || name.startsWith('s6-') || text.includes('student') || text.includes('college')) return 'academic';
    if (text.includes('ai') || text.includes('machine-learning') || text.includes('ml')) return 'ai';

    return 'all';
  };

  const prettyName = (name: string): string => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Helper to fetch language stats for a list of repos/names
  const loadLanguagesForRepos = async (
    items: { name: string; language?: string | null }[]
  ) => {
    for (const item of items) {
      try {
        const languages = await fetchRepoLanguages(item.name, item.language);
        setStatsMap((prev) => {
          const current = prev[item.name];
          if (!current) return prev;
          return {
            ...prev,
            [item.name]: {
              ...current,
              languages,
              isLoading: false
            }
          };
        });
      } catch {
        setStatsMap((prev) => {
          const current = prev[item.name];
          if (!current) return prev;
          return {
            ...prev,
            [item.name]: {
              ...current,
              isLoading: false
            }
          };
        });
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setApiError(false);

    // Seed initial stats for featured projects so cards have baseline stats immediately
    const initialFeaturedStats: Record<string, RepoSummaryStats> = {};
    featuredProjects.forEach((proj) => {
      const repoName = extractRepoNameFromUrl(proj.github);
      if (repoName) {
        initialFeaturedStats[repoName] = {
          stars: 0,
          lastUpdated: 'Recent',
          languages: [],
          isLoading: true
        };
      }
    });
    setStatsMap(initialFeaturedStats);

    fetch('https://api.github.com/users/sathwik-svg/repos?per_page=100&sort=updated')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API response not ok');
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          const nonForks = data.filter((r) => !r.fork);
          setRepos(nonForks);

          // Build updated stats map combining fetched repo details
          const newStats: Record<string, RepoSummaryStats> = { ...initialFeaturedStats };
          const reposToFetchLanguages: { name: string; language?: string | null }[] = [];

          // Map API data to featured projects
          featuredProjects.forEach((proj) => {
            const repoName = extractRepoNameFromUrl(proj.github);
            if (!repoName) return;
            const match = nonForks.find((r) => r.name.toLowerCase() === repoName.toLowerCase());
            newStats[repoName] = {
              stars: match ? match.stargazers_count : 0,
              lastUpdated: match ? formatDate(match.pushed_at || match.updated_at) : 'Oct 2024',
              rawDate: match?.pushed_at || match?.updated_at,
              languages: [],
              isLoading: true
            };
            reposToFetchLanguages.push({
              name: repoName,
              language: match?.language || null
            });
          });

          // Map API data to all public catalog repos
          nonForks.forEach((repo) => {
            if (!newStats[repo.name]) {
              newStats[repo.name] = {
                stars: repo.stargazers_count,
                lastUpdated: formatDate(repo.pushed_at || repo.updated_at),
                rawDate: repo.pushed_at || repo.updated_at,
                languages: [],
                isLoading: true
              };
              reposToFetchLanguages.push({
                name: repo.name,
                language: repo.language
              });
            }
          });

          setStatsMap(newStats);

          // Asynchronously fetch language breakdowns
          loadLanguagesForRepos(reposToFetchLanguages);
        } else {
          setApiError(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiError(true);
          const featuredItems = featuredProjects
            .map((p) => ({
              name: extractRepoNameFromUrl(p.github) || '',
              language: null
            }))
            .filter((item) => item.name);
          loadLanguagesForRepos(featuredItems);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort Featured Projects
  const filteredFeatured = useMemo(() => {
    return featuredProjects.filter((proj) => {
      const repoName = extractRepoNameFromUrl(proj.github);
      const stats = repoName ? statsMap[repoName] : null;

      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesDesc = proj.description.toLowerCase().includes(q);
        const matchesTech = proj.tech.toLowerCase().includes(q);
        const matchesFocus = proj.focus.toLowerCase().includes(q);
        const matchesNumber = (proj.number || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTech && !matchesFocus && !matchesNumber) {
          return false;
        }
      }

      // 2. Project Type Filter
      if (selectedType !== 'all') {
        const fullText = `${proj.title} ${proj.description} ${proj.tech} ${proj.focus} ${proj.kicker}`.toLowerCase();
        if (selectedType === 'cloud' && !fullText.includes('aws') && !fullText.includes('cloud') && !fullText.includes('lambda')) return false;
        if (selectedType === 'devops' && !fullText.includes('ci/cd') && !fullText.includes('actions') && !fullText.includes('delivery')) return false;
        if (selectedType === 'kubernetes' && !fullText.includes('kubernetes') && !fullText.includes('k8s')) return false;
        if (selectedType === 'terraform' && !fullText.includes('terraform') && !fullText.includes('iac')) return false;
        if (selectedType === 'docker' && !fullText.includes('docker') && !fullText.includes('container')) return false;
        if (selectedType === 'monitoring' && !fullText.includes('monitoring') && !fullText.includes('observability')) return false;
        if (selectedType === 'academic' || selectedType === 'ai') return false;
      }

      // 3. Tech Stack Filter
      if (selectedTech !== 'all') {
        const techLower = selectedTech.toLowerCase();
        const matchesDeclaredTech = proj.tech.toLowerCase().includes(techLower);
        const matchesLangBreakdown = stats?.languages?.some(
          (l) => l.name.toLowerCase() === techLower
        );
        if (!matchesDeclaredTech && !matchesLangBreakdown) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const aName = extractRepoNameFromUrl(a.github);
      const bName = extractRepoNameFromUrl(b.github);
      const aStats = aName ? statsMap[aName] : null;
      const bStats = bName ? statsMap[bName] : null;

      if (selectedSort === 'stars') {
        return (bStats?.stars || 0) - (aStats?.stars || 0);
      }
      if (selectedSort === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (selectedSort === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      // 'recent'
      const aDate = aStats?.rawDate ? new Date(aStats.rawDate).getTime() : 0;
      const bDate = bStats?.rawDate ? new Date(bStats.rawDate).getTime() : 0;
      return bDate - aDate;
    });
  }, [searchQuery, selectedType, selectedTech, selectedSort, statsMap]);

  // Filter and sort Catalog Repositories
  const filteredCatalog = useMemo(() => {
    return repos.filter((repo) => {
      const type = classifyRepo(repo);
      const stats = statsMap[repo.name];

      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = repo.name.toLowerCase().includes(q);
        const matchesDesc = (repo.description || '').toLowerCase().includes(q);
        const matchesLang = (repo.language || '').toLowerCase().includes(q);
        const matchesTopics = (repo.topics || []).some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesLang && !matchesTopics) {
          return false;
        }
      }

      // 2. Project Type Filter
      if (selectedType !== 'all') {
        if (type !== selectedType) {
          // Additional fallback check for partial matches
          const fullText = `${repo.name} ${repo.description || ''}`.toLowerCase();
          if (selectedType === 'cloud' && !fullText.includes('cloud') && !fullText.includes('aws')) return false;
          if (selectedType === 'devops' && !fullText.includes('devops') && !fullText.includes('cicd')) return false;
          if (selectedType === 'kubernetes' && !fullText.includes('kubernetes')) return false;
          if (selectedType === 'terraform' && !fullText.includes('terraform')) return false;
          if (selectedType === 'docker' && !fullText.includes('docker')) return false;
          if (selectedType === 'monitoring' && !fullText.includes('monitoring')) return false;
          if (selectedType === 'academic' && !fullText.includes('s1-') && !fullText.includes('s2-') && !fullText.includes('student')) return false;
          if (selectedType === 'ai' && !fullText.includes('ai') && !fullText.includes('ml')) return false;
        }
      }

      // 3. Tech Stack Filter
      if (selectedTech !== 'all') {
        const techLower = selectedTech.toLowerCase();
        const matchesLang = (repo.language || '').toLowerCase() === techLower;
        const matchesText = `${repo.name} ${repo.description || ''}`.toLowerCase().includes(techLower);
        const matchesLanguages = stats?.languages?.some(
          (l) => l.name.toLowerCase() === techLower
        );
        if (!matchesLang && !matchesText && !matchesLanguages) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (selectedSort === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      // 'recent'
      const aDate = new Date(a.pushed_at || a.updated_at).getTime();
      const bDate = new Date(b.pushed_at || b.updated_at).getTime();
      return bDate - aDate;
    });
  }, [repos, searchQuery, selectedType, selectedTech, selectedSort, statsMap]);

  const totalCount = featuredProjects.length + repos.length;
  const filteredTotalCount = filteredFeatured.length + filteredCatalog.length;

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Hero */}
      <section
        className="relative p-8 md:p-14 mb-12 rounded-xl border overflow-hidden"
        style={{
          borderColor: 'var(--panel-border)',
          background:
            'linear-gradient(135deg, rgba(255, 153, 0, 0.08), rgba(83, 159, 229, 0.05) 45%, rgba(255, 255, 255, 0.02))'
        }}
      >
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--aws-orange)' }}>
          Cloud Engineering Portfolio
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
          Projects &amp; Engineering Solutions
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          A practical engineering portfolio covering AWS, cloud infrastructure, DevOps automation,
          Kubernetes, Terraform, Docker, CI/CD, monitoring, software engineering and B.Tech projects.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'Linux', 'Python'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-bold rounded"
              style={{
                border: '1px solid rgba(255, 153, 0, 0.25)',
                backgroundColor: 'rgba(255, 153, 0, 0.08)',
                color: 'var(--aws-orange-light)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Interactive Filter & Sort Toolbar Component */}
      <ProjectFilterComponent
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTech={selectedTech}
        onTechChange={setSelectedTech}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        onReset={handleResetFilters}
        totalProjectsCount={totalCount}
        filteredCount={filteredTotalCount}
      />

      {/* Featured Cloud & DevOps Projects */}
      <section className="mb-20">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>
              Featured Cloud &amp; DevOps
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Flagship projects with live GitHub summary statistics.
            </p>
          </div>
          <span className="text-xs opacity-60 font-mono">
            {filteredFeatured.length} featured shown
          </span>
        </div>

        {filteredFeatured.length === 0 ? (
          <div
            className="p-8 rounded-xl border text-center text-sm"
            style={{
              backgroundColor: 'var(--panel)',
              borderColor: 'var(--panel-border)',
              color: 'var(--text-muted)'
            }}
          >
            No featured projects matched your active filters. Check the repository catalog below or{' '}
            <button
              onClick={handleResetFilters}
              className="text-amber-400 font-bold underline cursor-pointer ml-1"
            >
              reset filters
            </button>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatured.map((proj) => {
              const repoName = extractRepoNameFromUrl(proj.github);
              const stats = repoName ? statsMap[repoName] : null;

              return (
                <TiltCard
                  key={proj.id}
                  tiltAngle={6.5}
                  perspective={1100}
                  className="rounded-xl"
                >
                  <article
                    className="group relative p-6 rounded-xl border flex flex-col justify-between h-full shadow-sm hover:shadow-2xl transition-colors duration-200"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'var(--panel-border)'
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-transform origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ backgroundColor: 'var(--aws-orange)' }}
                    />

                    <div>
                      <div className="text-xs font-bold tracking-wider mb-2" style={{ color: 'var(--aws-orange)' }}>
                        {proj.number}
                      </div>
                      <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-main)' }}>
                        {proj.title}
                      </h3>
                      <p className="text-xs md:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                        {proj.description}
                      </p>

                      {/* Summary Statistics Section (Stars, Last Updated, Language Breakdown) */}
                      <div className="mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5 opacity-90">
                          GitHub Summary Statistics
                        </span>
                        <ProjectStatsSection stats={stats} />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t" style={{ borderColor: 'var(--panel-border)' }}>
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border transition-colors hover:border-amber-500"
                          style={{ borderColor: 'var(--panel-border)', color: 'var(--text-main)' }}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          GitHub →
                        </a>
                      )}

                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border transition-colors hover:border-amber-500"
                          style={{ borderColor: 'var(--panel-border)', color: 'var(--text-main)' }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo ↗
                        </a>
                      )}

                      <button
                        onClick={() =>
                          onSelectProject({
                            ...proj,
                            stats: stats || undefined
                          })
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer hover:brightness-110 ml-auto"
                        style={{
                          backgroundColor: 'rgba(255, 153, 0, 0.15)',
                          color: 'var(--aws-orange-light)',
                          border: '1px solid rgba(255, 153, 0, 0.3)'
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </article>
                </TiltCard>
              );
            })}
          </div>
        )}
      </section>

      {/* GitHub Repository Catalog */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
              All Engineering Projects
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Public GitHub repositories with live stars, updated timestamps, and language composition.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>{filteredCatalog.length} repositories matching criteria</span>
          </div>
        </div>

        {/* Repos Grid */}
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Loading repositories and statistics from GitHub API...
            </span>
          </div>
        ) : apiError ? (
          <div
            className="p-8 rounded-xl border text-center flex flex-col items-center justify-center gap-3"
            style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}
          >
            <AlertCircle className="w-8 h-8 text-amber-500" />
            <h4 className="font-bold" style={{ color: 'var(--text-main)' }}>
              GitHub Repositories Catalog
            </h4>
            <p className="text-xs md:text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
              GitHub rate limits may temporarily delay API fetching. You can explore all public repositories directly on Sathwik's profile.
            </p>
            <a
              href="https://github.com/sathwik-svg?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-xs uppercase"
              style={{ backgroundColor: 'var(--aws-orange)', color: '#111' }}
            >
              <GithubIcon className="w-4 h-4" />
              View All Repositories on GitHub →
            </a>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div
            className="p-10 rounded-xl border text-center"
            style={{
              backgroundColor: 'var(--panel)',
              borderColor: 'var(--panel-border)'
            }}
          >
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
              No repositories matched the selected filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-lg text-xs font-bold border transition-colors hover:border-amber-500"
              style={{
                backgroundColor: 'rgba(255, 153, 0, 0.1)',
                color: 'var(--aws-orange-light)',
                borderColor: 'rgba(255, 153, 0, 0.3)'
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCatalog.map((repo, idx) => {
              const type = classifyRepo(repo);
              const stats = statsMap[repo.name] || {
                stars: repo.stargazers_count,
                lastUpdated: formatDate(repo.pushed_at || repo.updated_at),
                languages: repo.language
                  ? [{ name: repo.language, bytes: 100, percentage: 100, color: '#38bdf8' }]
                  : [],
                isLoading: false
              };

              return (
                <TiltCard
                  key={repo.id}
                  tiltAngle={5.5}
                  perspective={1000}
                  className="rounded-xl cursor-pointer"
                  onClick={() =>
                    onSelectProject({
                      id: repo.name,
                      kicker: 'GITHUB REPOSITORY',
                      title: prettyName(repo.name),
                      description:
                        repo.description || 'Engineering project repository maintained by Sathwik Ganji.',
                      tech: repo.language || 'GitHub Repository',
                      focus: 'Software engineering and practical development',
                      architecture: `GITHUB REPOSITORY\n      ↓\nSOURCE CODE\n      ↓\nENGINEERING IMPLEMENTATION\n      ↓\nDOCUMENTATION / PROJECT OUTPUT`,
                      github: repo.html_url,
                      stats
                    })
                  }
                >
                  <article
                    className="group p-5 rounded-xl border flex flex-col justify-between h-full hover:border-amber-500/50 shadow-sm transition-colors duration-200"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'var(--panel-border)'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold tracking-wider mb-2">
                        <span style={{ color: 'var(--aws-orange)' }}>
                          REPOSITORY {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-semibold uppercase text-amber-400">
                          {type === 'all' ? 'Engineering' : type.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold mb-2 group-hover:text-amber-400 transition-colors" style={{ color: 'var(--text-main)' }}>
                        {prettyName(repo.name)}
                      </h3>

                      <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>
                        {repo.description || 'Engineering project repository.'}
                      </p>

                      {/* Summary Statistics Section */}
                      <div className="mb-2">
                        <ProjectStatsSection stats={stats} compact />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-3 mt-1 border-t" style={{ borderColor: 'var(--panel-border)' }}>
                      <span className="font-semibold text-sky-400">
                        {repo.language || 'Codebase'}
                      </span>
                      <span className="opacity-70 group-hover:text-amber-400 transition-colors" style={{ color: 'var(--text-muted)' }}>
                        Click for details →
                      </span>
                    </div>
                  </article>
                </TiltCard>
              );
            })}
          </div>
        )}
      </section>

      {/* Troubleshooting & Engineering Cases */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            🛠 Troubleshooting &amp; Engineering Cases
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Real engineering problems, root-cause investigation, and resolution architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {troubleshootingCases.map((cs) => (
            <TiltCard
              key={cs.id}
              tiltAngle={5}
              perspective={1000}
              className="rounded-xl"
            >
              <article
                className="p-6 rounded-xl border border-l-4 h-full shadow-sm hover:shadow-xl transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--panel)',
                  borderColor: 'var(--panel-border)',
                  borderLeftColor: 'var(--aws-orange)'
                }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--aws-orange)' }}>
                  {cs.label}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-main)' }}>
                  {cs.title}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  {cs.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cs.flow.map((step) => (
                    <span
                      key={step}
                      className="px-2 py-0.5 rounded text-[11px] font-mono border"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-main)'
                      }}
                    >
                      {step}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() =>
                    onSelectProject({
                      id: cs.id,
                      kicker: 'TROUBLESHOOTING CASE',
                      title: cs.title,
                      description: cs.description,
                      tech: cs.tech,
                      focus: cs.focus,
                      architecture: cs.architecture
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold border transition-colors hover:border-amber-500 cursor-pointer"
                  style={{ borderColor: 'var(--panel-border)', color: 'var(--text-main)' }}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  View Case →
                </button>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
};
