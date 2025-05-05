import React, { useRef } from 'react';
import { ClipboardCopy, Download } from 'lucide-react';

interface ResultPanelProps {
  result: string;
  isProcessing: boolean;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ result, isProcessing }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      // In a real app, you might want to show a success toast here
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      if (textareaRef.current) {
        textareaRef.current.select();
        document.execCommand('copy');
      }
    }
  };

  const downloadResult = () => {
    if (!result) return;
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'alphabetized-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-md border border-gray-300 p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-800">Result</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            disabled={!result || isProcessing}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            title="Copy to clipboard"
          >
            <ClipboardCopy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button
            onClick={downloadResult}
            disabled={!result || isProcessing}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            title="Download as file"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        readOnly
        className="w-full h-64 p-4 border border-gray-300 rounded-md bg-gray-50 resize-y"
        value={isProcessing ? 'Processing...' : result}
        placeholder="Results will appear here..."
      />
      <div className="mt-2 text-right text-sm text-gray-500">
        {result.length} characters | {result.split(/\n/).filter(line => line.trim()).length} lines
      </div>
    </div>
  );
};

export default ResultPanel;