import React from 'react';
import { RepoSummaryStats } from '../types';
import { Star, Calendar, Code2 } from 'lucide-react';

interface ProjectStatsSectionProps {
  stats?: RepoSummaryStats | null;
  compact?: boolean;
}

export const ProjectStatsSection: React.FC<ProjectStatsSectionProps> = ({ stats, compact = false }) => {
  if (!stats) {
    return (
      <div className="py-2.5 px-3 rounded-lg border border-dashed border-white/10 text-xs opacity-60 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400" /> --
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-sky-400" /> --
        </span>
      </div>
    );
  }

  const { stars, lastUpdated, languages, isLoading } = stats;

  return (
    <div
      className={`rounded-lg border transition-colors ${
        compact ? 'p-2.5 text-xs' : 'p-3.5 text-xs md:text-sm'
      }`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.025)',
        borderColor: 'rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Top Row: Stars and Last Updated Date */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div
          className="inline-flex items-center gap-1.5 font-bold tracking-tight px-2 py-1 rounded"
          style={{
            backgroundColor: 'rgba(255, 153, 0, 0.08)',
            border: '1px solid rgba(255, 153, 0, 0.25)',
            color: 'var(--aws-orange-light)'
          }}
          title={`${stars} GitHub stars`}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{stars} {stars === 1 ? 'star' : 'stars'}</span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-[11px] opacity-75 font-mono"
          style={{ color: 'var(--text-muted)' }}
          title={`Last updated on ${lastUpdated}`}
        >
          <Calendar className="w-3 h-3 text-sky-400" />
          <span>Updated {lastUpdated}</span>
        </div>
      </div>

      {/* Language Breakdown Bar */}
      {isLoading ? (
        <div className="w-full h-1.5 rounded-full bg-white/10 animate-pulse my-2" />
      ) : languages && languages.length > 0 ? (
        <div className="space-y-1.5 pt-1">
          {/* Segmented Progress Bar */}
          <div
            className="w-full h-2 rounded-full overflow-hidden flex bg-white/10 shadow-inner"
            title={languages.map((l) => `${l.name}: ${l.percentage}%`).join(' | ')}
          >
            {languages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  width: `${Math.max(lang.percentage, 3)}%`,
                  backgroundColor: lang.color
                }}
                className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              />
            ))}
          </div>

          {/* Language Labels */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            {languages.slice(0, compact ? 3 : 5).map((lang, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 opacity-85">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="font-medium" style={{ color: 'var(--text-main)' }}>
                  {lang.name}
                </span>
                <span className="opacity-60 text-[10px] font-mono">
                  {lang.percentage}%
                </span>
              </span>
            ))}
            {compact && languages.length > 3 && (
              <span className="text-[10px] opacity-50 font-mono">
                +{languages.length - 3} more
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[11px] opacity-60">
          <Code2 className="w-3 h-3 text-sky-400" />
          <span>GitHub Project</span>
        </div>
      )}
    </div>
  );
};
