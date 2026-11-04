import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Layers, Cpu, Tag } from 'lucide-react';

export type ProjectTypeFilter =
  | 'all'
  | 'cloud'
  | 'devops'
  | 'kubernetes'
  | 'terraform'
  | 'docker'
  | 'academic'
  | 'ai'
  | 'monitoring';

export type TechStackFilter =
  | 'all'
  | 'AWS'
  | 'Kubernetes'
  | 'Terraform'
  | 'Docker'
  | 'CI/CD'
  | 'Linux'
  | 'Python'
  | 'TypeScript'
  | 'JavaScript'
  | 'PostgreSQL';

export type SortByOption = 'recent' | 'stars' | 'name-asc' | 'name-desc';

interface ProjectFilterComponentProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: ProjectTypeFilter;
  onTypeChange: (type: ProjectTypeFilter) => void;
  selectedTech: TechStackFilter;
  onTechChange: (tech: TechStackFilter) => void;
  selectedSort: SortByOption;
  onSortChange: (sort: SortByOption) => void;
  onReset: () => void;
  totalProjectsCount: number;
  filteredCount: number;
}

export const ProjectFilterComponent: React.FC<ProjectFilterComponentProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedTech,
  onTechChange,
  selectedSort,
  onSortChange,
  onReset,
  totalProjectsCount,
  filteredCount
}) => {
  const projectTypes: { label: string; value: ProjectTypeFilter }[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Cloud Infrastructure', value: 'cloud' },
    { label: 'DevOps & CI/CD', value: 'devops' },
    { label: 'Kubernetes', value: 'kubernetes' },
    { label: 'Terraform IaC', value: 'terraform' },
    { label: 'Docker & Containers', value: 'docker' },
    { label: 'Operations & Monitoring', value: 'monitoring' },
    { label: 'Academic / B.Tech', value: 'academic' },
    { label: 'AI / ML', value: 'ai' }
  ];

  const techStacks: { label: string; value: TechStackFilter }[] = [
    { label: 'All Technologies', value: 'all' },
    { label: 'AWS', value: 'AWS' },
    { label: 'Kubernetes', value: 'Kubernetes' },
    { label: 'Terraform', value: 'Terraform' },
    { label: 'Docker', value: 'Docker' },
    { label: 'CI/CD', value: 'CI/CD' },
    { label: 'Linux', value: 'Linux' },
    { label: 'Python', value: 'Python' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'PostgreSQL', value: 'PostgreSQL' }
  ];

  const sortOptions: { label: string; value: SortByOption }[] = [
    { label: 'Most Recently Updated', value: 'recent' },
    { label: 'Most Stars ⭐', value: 'stars' },
    { label: 'Alphabetical (A - Z)', value: 'name-asc' },
    { label: 'Alphabetical (Z - A)', value: 'name-desc' }
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedTech !== 'all' ||
    selectedSort !== 'recent';

  return (
    <div
      className="p-5 md:p-6 rounded-2xl border mb-12 shadow-md transition-colors"
      style={{
        backgroundColor: 'var(--panel)',
        borderColor: 'var(--panel-border)'
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
              Filter &amp; Sort Projects
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Narrow projects by technology stack, project category, keyword, or popularity
            </p>
          </div>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 self-start md:self-auto text-xs">
          <span
            className="px-2.5 py-1 rounded-full font-mono font-semibold border"
            style={{
              backgroundColor: 'rgba(255, 153, 0, 0.08)',
              borderColor: 'rgba(255, 153, 0, 0.25)',
              color: 'var(--aws-orange-light)'
            }}
          >
            {filteredCount} of {totalProjectsCount} projects
          </span>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-medium cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Control Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {/* Search Input */}
        <div className="relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70" style={{ color: 'var(--text-main)' }}>
            Search Keyword
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, tech, topics..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs md:text-sm border outline-none transition-all focus:border-amber-500"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-0.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Project Type Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70 flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
            <Layers className="w-3 h-3 text-amber-500" />
            Project Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as ProjectTypeFilter)}
            className="w-full px-3 py-2 rounded-xl text-xs md:text-sm border outline-none cursor-pointer transition-all focus:border-amber-500"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--panel-border)',
              color: 'var(--text-main)'
            }}
          >
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tech Stack Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70 flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
            <Cpu className="w-3 h-3 text-sky-400" />
            Technology Stack
          </label>
          <select
            value={selectedTech}
            onChange={(e) => onTechChange(e.target.value as TechStackFilter)}
            className="w-full px-3 py-2 rounded-xl text-xs md:text-sm border outline-none cursor-pointer transition-all focus:border-amber-500"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--panel-border)',
              color: 'var(--text-main)'
            }}
          >
            {techStacks.map((tech) => (
              <option key={tech.value} value={tech.value}>
                {tech.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5 opacity-70 flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
            <ArrowUpDown className="w-3 h-3 text-emerald-400" />
            Sort By
          </label>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as SortByOption)}
            className="w-full px-3 py-2 rounded-xl text-xs md:text-sm border outline-none cursor-pointer transition-all focus:border-amber-500"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--panel-border)',
              color: 'var(--text-main)'
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Technology Chips for instant 1-click filtering */}
      <div className="pt-2 border-t flex flex-wrap items-center gap-1.5" style={{ borderColor: 'var(--panel-border)' }}>
        <span className="text-[11px] font-medium opacity-60 mr-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          <Tag className="w-3 h-3" /> Quick Tech:
        </span>
        {techStacks.map((tech) => {
          const isActive = selectedTech === tech.value;
          return (
            <button
              key={tech.value}
              onClick={() => onTechChange(isActive ? 'all' : tech.value)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer border ${
                isActive
                  ? 'border-amber-500 text-amber-300 bg-amber-500/15 font-bold shadow-xs'
                  : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
              }`}
              style={{
                backgroundColor: isActive ? 'rgba(255, 153, 0, 0.15)' : 'transparent',
                color: isActive ? 'var(--aws-orange-light)' : 'var(--text-main)'
              }}
            >
              {tech.label === 'All Technologies' ? 'All' : tech.label}
            </button>
          );
        })}
      </div>

      {/* Active Filter Tags Bar if any filter is set */}
      {hasActiveFilters && (
        <div className="mt-3.5 pt-3 border-t flex flex-wrap items-center gap-2 text-xs" style={{ borderColor: 'var(--panel-border)' }}>
          <span className="opacity-60 text-[11px]">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px]">
              Keyword: "{searchQuery}"
              <button onClick={() => onSearchChange('')} className="hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px]">
              Type: {projectTypes.find((t) => t.value === selectedType)?.label}
              <button onClick={() => onTypeChange('all')} className="hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTech !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px]">
              Tech: {selectedTech}
              <button onClick={() => onTechChange('all')} className="hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSort !== 'recent' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px]">
              Sort: {sortOptions.find((s) => s.value === selectedSort)?.label}
              <button onClick={() => onSortChange('recent')} className="hover:text-white cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
