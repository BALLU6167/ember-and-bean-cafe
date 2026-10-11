import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { WorkspaceModeSection } from '../components/workspace/WorkspaceModeSection';
import { useLanguage } from '../context/LanguageContext';

interface WorkspacePageProps {
  onBackToHome: () => void;
  onBookDesk?: () => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({ onBackToHome, onBookDesk }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent text-[#FAF6F0]">
      <PageHeader
        badge={t.workspaceBadge}
        title={t.workspaceTitle}
        description={t.workspaceSubtitle}
        onBackToHome={onBackToHome}
        breadcrumbs={[t.navWorkspace]}
      />

      <WorkspaceModeSection onBookDesk={onBookDesk} />
    </div>
  );
};
