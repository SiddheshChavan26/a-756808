
import { useLogAnalysis } from '@/hooks/use-log-analysis';
import { LogAnalysisHeader } from '@/components/logs/LogAnalysisHeader';
import { LogAnalysisTabs } from '@/components/logs/LogAnalysisTabs';

function LogAnalysis() {
  const {
    logContent,
    fileName,
    issues,
    prompts,
    solutions,
    highlightedLines,
    selectedLogLine,
    activeTab,
    setActiveTab,
    handleFileProcessed,
    handleSelectIssue,
    handleSelectLogLine,
    handleApplySolution,
    handleRejectSolution,
  } = useLogAnalysis();

  return (
    <div className="p-6 space-y-6">
      <LogAnalysisHeader 
        hasContent={!!logContent}
        onFileProcessed={handleFileProcessed}
      />
      
      {logContent && (
        <div className="space-y-6">
          <LogAnalysisTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            logContent={logContent}
            fileName={fileName || undefined}
            highlightedLines={highlightedLines}
            selectedLogLine={selectedLogLine}
            onSelectLine={handleSelectLogLine}
            issues={issues}
            onSelectIssue={handleSelectIssue}
            prompts={prompts}
            solutions={solutions}
            onApplySolution={handleApplySolution}
            onRejectSolution={handleRejectSolution}
          />
        </div>
      )}
    </div>
  );
}

export default LogAnalysis;
