
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogUploader } from '@/components/logs/LogUploader';
import { LogViewer } from '@/components/logs/LogViewer';
import { IssueTimeline, LogIssue } from '@/components/logs/IssueTimeline';
import { DiagnosticPromptViewer } from '@/components/logs/DiagnosticPromptViewer';
import { SolutionPanel } from '@/components/logs/SolutionPanel';
import { toast } from 'sonner';

// Mock data and analysis functions for demo purposes
// In a real application, these would come from API calls
const mockAnalyzeLog = (logContent: string, fileName: string) => {
  // This is where you'd normally send the log to a backend API
  // For demo purposes, we'll just simulate some processing time
  // and return mock data
  
  return new Promise<{
    issues: LogIssue[];
    prompts: any[];
    solutions: any[];
    highlightedLines: number[];
  }>((resolve) => {
    setTimeout(() => {
      // Generate some mock issues based on the log content
      const issues: LogIssue[] = [];
      const lines = logContent.split('\n');
      const highlightedLines: number[] = [];
      
      // Simple pattern matching to find "issues" in the logs
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes('error') || line.toLowerCase().includes('exception')) {
          const isNPE = line.includes('NullPointerException');
          const isTimeout = line.includes('timeout') || line.includes('timed out');
          const isConfig = line.includes('config') || line.includes('configuration');
          const isMemory = line.includes('memory') || line.includes('heap');
          const isIO = line.includes('I/O') || line.includes('IOException');
          const isDB = line.includes('database') || line.includes('SQLException');
          const isAuth = line.includes('auth') || line.includes('permission');
          
          let type: LogIssue['type'] = 'UNKNOWN';
          if (isNPE) type = 'NPE';
          else if (isTimeout) type = 'TIMEOUT';
          else if (isConfig) type = 'CONFIG';
          else if (isMemory) type = 'MEMORY';
          else if (isIO) type = 'IO';
          else if (isDB) type = 'DATABASE';
          else if (isAuth) type = 'AUTH';
          
          // Extract timestamp - simplified
          const timestampMatch = line.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
          const timestamp = timestampMatch ? timestampMatch[0] : new Date().toISOString();
          
          // Extract service - simplified
          const serviceMatch = line.match(/\[([\w-]+)\]/);
          const service = serviceMatch ? serviceMatch[1] : 'unknown-service';
          
          // Calculate severity based on keywords
          let severity: LogIssue['severity'] = 'LOW';
          if (line.includes('CRITICAL') || line.includes('FATAL')) severity = 'CRITICAL';
          else if (line.includes('ERROR')) severity = 'HIGH';
          else if (line.includes('WARNING')) severity = 'MEDIUM';
          
          issues.push({
            id: issues.length + 1,
            timestamp,
            service,
            type,
            message: line.length > 100 ? line.substring(0, 100) + '...' : line,
            logLineId: index,
            severity
          });
          
          highlightedLines.push(index);
        }
      });
      
      // Generate mock prompts and solutions
      const prompts = issues.map(issue => ({
        id: `prompt-${issue.id}`,
        issueId: issue.id,
        template: { id: 'default', text: 'Template text' },
        generatedText: `Diagnostic prompt for ${issue.type} issue in ${issue.service}:\n\n` +
          `1. What was the state of the application when this occurred?\n` +
          `2. Are there any related log entries before this error?\n` +
          `3. Has this issue happened before?\n` +
          `4. Check the configuration settings for ${issue.service}.\n` +
          `5. Verify network connectivity between services.`,
        logLineId: issue.logLineId
      }));
      
      const solutions = issues.map(issue => ({
        id: `solution-${issue.id}`,
        issueId: issue.id,
        text: `Recommended solution for ${issue.type} issue in ${issue.service}:\n\n` +
          `1. Check the service configuration.\n` +
          `2. Verify proper initialization of components.\n` +
          `3. Ensure all dependencies are available.\n` +
          `4. Review recent code changes that might have affected this component.\n` +
          `5. Consider increasing the timeout values if appropriate.`,
        source: Math.random() > 0.5 ? 'AI' : 'HARDCODED',
        status: 'PENDING',
        tag: issue.severity === 'CRITICAL' ? 'CRITICAL' : 
             issue.severity === 'HIGH' ? 'WARNING' : 'INFO'
      }));
      
      resolve({
        issues,
        prompts,
        solutions,
        highlightedLines
      });
    }, 1500); // Simulate processing time
  });
};

function LogAnalysis() {
  const [logContent, setLogContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [issues, setIssues] = useState<LogIssue[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
  const [selectedLogLine, setSelectedLogLine] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('viewer');

  const handleFileProcessed = async (content: string, name: string) => {
    setLogContent(content);
    setFileName(name);
    setIsAnalyzing(true);
    
    try {
      const result = await mockAnalyzeLog(content, name);
      setIssues(result.issues);
      setPrompts(result.prompts);
      setSolutions(result.solutions);
      setHighlightedLines(result.highlightedLines);
      
      toast.success('Log analysis complete', {
        description: `Found ${result.issues.length} potential issues`
      });
      
      // Switch to the appropriate tab if issues were found
      if (result.issues.length > 0) {
        setActiveTab('issues');
      }
    } catch (error) {
      toast.error('Error analyzing log file', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectIssue = (issue: LogIssue) => {
    setSelectedLogLine(issue.logLineId);
    setActiveTab('viewer');
  };

  const handleSelectLogLine = (lineId: number) => {
    setSelectedLogLine(lineId);
    setActiveTab('viewer');
  };

  const handleApplySolution = (solution: any) => {
    setSolutions(solutions.map(s => 
      s.id === solution.id ? { ...s, status: 'APPLIED' } : s
    ));
    
    toast.success('Solution applied', {
      description: 'The suggested solution has been applied'
    });
  };

  const handleRejectSolution = (solution: any) => {
    setSolutions(solutions.map(s => 
      s.id === solution.id ? { ...s, status: 'REJECTED' } : s
    ));
    
    toast.success('Solution dismissed', {
      description: 'The suggested solution has been dismissed'
    });
  };

  useEffect(() => {
    // Scroll to the selected log line if any
    if (selectedLogLine !== null) {
      const element = document.getElementById(`log-line-${selectedLogLine}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedLogLine, activeTab]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Log Analysis</h1>
      
      {!logContent ? (
        <LogUploader onFileProcessed={handleFileProcessed} />
      ) : (
        <div className="space-y-6">
          {/* Action bar with upload new file button */}
          <div className="flex justify-end">
            <LogUploader onFileProcessed={handleFileProcessed} />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="viewer">
                Log Viewer {selectedLogLine !== null && `(Line #${selectedLogLine + 1})`}
              </TabsTrigger>
              <TabsTrigger value="issues">
                Issues {issues.length > 0 && `(${issues.length})`}
              </TabsTrigger>
              <TabsTrigger value="prompts">
                Diagnostic Prompts {prompts.length > 0 && `(${prompts.length})`}
              </TabsTrigger>
              <TabsTrigger value="solutions">
                Solutions {solutions.length > 0 && `(${solutions.length})`}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewer" className="mt-0">
              <LogViewer 
                logContent={logContent || ''} 
                fileName={fileName || undefined}
                highlightedIssues={highlightedLines}
                onSelectLine={setSelectedLogLine}
              />
            </TabsContent>
            
            <TabsContent value="issues" className="mt-0">
              <IssueTimeline 
                issues={issues}
                onSelectIssue={handleSelectIssue}
              />
            </TabsContent>
            
            <TabsContent value="prompts" className="mt-0">
              <DiagnosticPromptViewer 
                prompts={prompts}
                issues={issues}
                onSelectLogLine={handleSelectLogLine}
              />
            </TabsContent>
            
            <TabsContent value="solutions" className="mt-0">
              <SolutionPanel 
                solutions={solutions}
                issues={issues}
                onApplySolution={handleApplySolution}
                onRejectSolution={handleRejectSolution}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default LogAnalysis;
