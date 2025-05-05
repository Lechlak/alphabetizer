import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import ControlPanel from './components/ControlPanel';
import ResultPanel from './components/ResultPanel';
import AdBanner from './components/AdBanner';
import { processText, defaultOptions, TextProcessingOptions } from './utils/textProcessor';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [resultText, setResultText] = useState<string>('');
  const [options, setOptions] = useState<TextProcessingOptions>(defaultOptions);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleOptionsChange = useCallback((newOptions: Partial<TextProcessingOptions>) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      ...newOptions
    }));
  }, []);

  const handleProcess = useCallback(() => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const result = processText(inputText, options);
      setResultText(result);
      setIsProcessing(false);
    }, 300);
  }, [inputText, options]);

  const handleClearInput = useCallback(() => {
    setInputText('');
    setResultText('');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Text Alphabetizer</h1>
        <p className="text-gray-600 mb-6">Sort, format, and organize your text with ease</p>
        
        <AdBanner placement="top" />
        
        <div className="grid grid-cols-1 lg:grid-cols-1">
          <div className="lg:col-span-2 space-y-6">
             <ControlPanel 
              options={options}
              onChange={handleOptionsChange}
              onProcess={handleProcess}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 space-y-6">
            <div className="bg-white rounded-md border border-gray-300 p-4 ">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Input</h2>
              <TextInput 
                value={inputText} 
                onChange={setInputText}
                onClear={handleClearInput}
              />
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-1">
            <ResultPanel 
              result={resultText}
              isProcessing={isProcessing}
            />
            
     
          </div>
        </div>
        </div>
        
        <AdBanner placement="bottom" />
          
      </main>
      
      <Footer />
    </div>
  );
}

export default App;