import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Document as PDFDocument, Page as PDFPage, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import * as Babel from '@babel/standalone';
import { templates } from './templates';
import './App.css';

// Set up PDF.js worker - use the correct .mjs extension
const setupPDFWorker = () => {
  console.log('PDF.js version:', pdfjs.version);
  
  // The newer versions of pdfjs-dist use .mjs extension
  const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  console.log('Using worker source:', workerUrl);
};

setupPDFWorker();

// Register fonts
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

function App() {
  const [code, setCode] = useState(templates.quixote);
  const [documentComponent, setDocumentComponent] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('quixote');
  const [zoom, setZoom] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to generate PDF blob from component
  const generatePDF = async (component) => {
    try {
      if (!component) return;
      
      console.log('Generating PDF for component:', component);
      const blob = await pdf(React.createElement(component)).toBlob();
      console.log('PDF blob generated successfully:', blob);
      setPdfBlob(blob);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF: ' + err.message);
    }
  };

  // Function to safely evaluate the code
  const evaluateCode = (codeString) => {
    try {
      // Clear previous errors
      setError(null);
      
      // Transform JSX to regular JavaScript using Babel
      const transformedCode = Babel.transform(codeString, {
        presets: ['react'],
        plugins: []
      }).code;
      
      // Variable to capture the rendered component
      let capturedComponent = null;
      
      // Create a mock ReactPDF object
      const ReactPDF = {
        render: (component) => {
          capturedComponent = component;
          return component;
        }
      };
      
      // Create a function that has access to React-PDF components
      const func = new Function(
        'React',
        'Document',
        'Page',
        'Text',
        'View', 
        'StyleSheet',
        'Font',
        'Image',
        'ReactPDF',
        transformedCode
      );
      
      // Execute the function with React-PDF components
      func(
        React,
        PDFDocument, // Use PDFDocument instead of Document to avoid naming conflict
        PDFPage,     // Use PDFPage instead of Page
        Text,
        View,
        StyleSheet,
        Font,
        Image,
        ReactPDF
      );
      
      // If ReactPDF.render was called, use the captured component
      if (capturedComponent) {
        setDocumentComponent(() => () => capturedComponent);
        return;
      }
      
      // If no ReactPDF.render was called, try to find component by name
      // Re-execute to get access to defined variables
      const componentFunc = new Function(
        'React',
        'Document',
        'Page',
        'Text',
        'View', 
        'StyleSheet',
        'Font',
        'Image',
        'ReactPDF',
        `
        ${transformedCode}
        
        // Try different component names
        if (typeof MyDocument !== 'undefined') return MyDocument;
        if (typeof Quixote !== 'undefined') return Quixote;
        if (typeof Document !== 'undefined') return Document;
        
        throw new Error('No valid component found. Please define MyDocument, Quixote, or use ReactPDF.render()');
        `
      );
      
      const DocumentComponent = componentFunc(
        React,
        PDFDocument, // Use PDFDocument instead of Document
        PDFPage,     // Use PDFPage instead of Page
        Text,
        View,
        StyleSheet,
        Font,
        Image,
        ReactPDF
      );
      
      setDocumentComponent(() => DocumentComponent);
    } catch (err) {
      setError(err.message);
      console.error('Code evaluation error:', err);
    }
  };

  // Evaluate code on component mount and when code changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      evaluateCode(code);
    }, 300); // Debounce to avoid too many re-renders

    return () => clearTimeout(timeoutId);
  }, [code]);

  // Generate PDF when document component changes
  useEffect(() => {
    if (documentComponent && !error) {
      generatePDF(documentComponent);
    } else {
      setPdfBlob(null);
    }
  }, [documentComponent, error]);

  // Keyboard shortcuts for zoom and page navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.closest('.editor-container')) return; // Don't interfere with editor
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleZoomFit();
            break;
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            if (pdfBlob && numPages > 1) {
              e.preventDefault();
              handlePrevPage();
            }
            break;
          case 'ArrowRight':
            if (pdfBlob && numPages > 1) {
              e.preventDefault();
              handleNextPage();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pdfBlob, numPages, currentPage, zoom]); // Added currentPage and zoom to dependencies

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleRunCode = () => {
    evaluateCode(code);
  };

  const handleClearCode = () => {
    setCode(templates.quixote);
    setSelectedTemplate('quixote');
  };

  const handleTemplateChange = (templateName) => {
    setCode(templates[templateName]);
    setSelectedTemplate(templateName);
  };

  const handleDownload = async () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.4));
  };

  const handleZoomFit = () => {
    setZoom(1.0);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, numPages || 1));
  };

  // Calculate PDF width based on container size
  const calculatePDFWidth = () => {
    const containerWidth = window.innerWidth * 0.45; // 45% of window width
    const maxWidth = 800;
    const minWidth = 300;
    const baseWidth = Math.min(containerWidth, maxWidth);
    const finalWidth = Math.max(baseWidth, minWidth);
    return finalWidth * zoom;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React-PDF Playground</h1>
        <div className="header-buttons">
          <select 
            value={selectedTemplate} 
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="template-selector"
          >
            <option value="quixote">Don Quixote</option>
            <option value="simple">Simple Document</option>
            <option value="resume">Resume</option>
            <option value="invoice">Invoice</option>
            <option value="multipage">Multi-page Example</option>
          </select>
          <button className="btn btn-primary" onClick={handleRunCode}>
            Run Code
          </button>
          <button className="btn btn-secondary" onClick={handleClearCode}>
            Reset
          </button>
        </div>
      </header>
      
      <div className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>Code Editor</h2>
            <div className="panel-actions">
              <span className="language-tag">JavaScript</span>
            </div>
          </div>
          <div className="editor-container">
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: 'on',
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
              }}
            />
          </div>
        </div>          <div className="preview-panel">
          <div className="panel-header">
            <h2>PDF Preview</h2>
            <div className="panel-actions">
              {error && <div className="error-message">Error: {error}</div>}
              {!error && documentComponent && (
                <div className="success-message">
                  <span>✓ PDF Generated</span>
                  <button 
                    className="btn btn-download" 
                    onClick={handleDownload}
                    disabled={!pdfBlob}
                  >
                    Download PDF
                  </button>
                </div>
              )}
              {pdfBlob && !error && (
                <div className="pdf-controls">
                  <div className="zoom-controls">
                    <button className="btn btn-zoom" onClick={handleZoomOut} disabled={zoom <= 0.4}>
                      −
                    </button>
                    <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                    <button className="btn btn-zoom" onClick={handleZoomIn} disabled={zoom >= 3.0}>
                      +
                    </button>
                    <button className="btn btn-zoom" onClick={handleZoomFit}>
                      Fit
                    </button>
                  </div>
                  {numPages > 1 && (
                    <div className="page-controls">
                      <button className="btn btn-page" onClick={handlePrevPage} disabled={currentPage <= 1}>
                        ‹
                      </button>
                      <span className="page-info">
                        {currentPage} / {numPages}
                      </span>
                      <button className="btn btn-page" onClick={handleNextPage} disabled={currentPage >= numPages}>
                        ›
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="preview-container">
            {pdfBlob && !error ? (
              <div className="pdf-viewer-container">
                <Document
                  file={pdfBlob}
                  onLoadSuccess={({ numPages }) => {
                    console.log('PDF loaded successfully, pages:', numPages);
                    setNumPages(numPages);
                    setCurrentPage(1); // Reset to first page
                    setError(null); // Clear any previous errors
                  }}
                  onLoadError={(error) => {
                    console.error('PDF load error:', error);
                    setError('Failed to load PDF: ' + error.message);
                  }}
                  loading={
                    <div className="loading">
                      <div className="loading-spinner"></div>
                      <p>Loading PDF...</p>
                    </div>
                  }
                  error={
                    <div className="error-display">
                      <h3>Failed to load PDF</h3>
                      <p>There was an error loading the PDF document.</p>
                    </div>
                  }
                >
                  <Page 
                    pageNumber={currentPage}
                    width={calculatePDFWidth()}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page"
                  />
                </Document>
                {numPages > 1 && (
                  <div className="page-info-bottom">
                    Page {currentPage} of {numPages}
                  </div>
                )}
              </div>
            ) : (
              <div className="preview-placeholder">
                {error ? (
                  <div className="error-display">
                    <h3>Error in code:</h3>
                    <pre>{error}</pre>
                    <p>Please check your code and try again.</p>
                  </div>
                ) : (
                  <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Generating PDF...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
