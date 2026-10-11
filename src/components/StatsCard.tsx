import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          {label}
        </p>
        <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </h4>
        {subtext && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {subtext}
          </p>
        )}
        {trend && (
          <span className="inline-block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
            {trend}
          </span>
        )}
      </div>

      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
