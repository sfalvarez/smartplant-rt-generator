import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Document as PDFDocument, Page as PDFPage, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import * as Babel from '@babel/standalone';
import { templates } from './templates';
import openSansLight from './fonts/OpenSans/OpenSans-Light.ttf';
import openSansRegular from './fonts/OpenSans/OpenSans-Regular.ttf';
import openSansMedium from './fonts/OpenSans/OpenSans-Medium.ttf';
import openSansSemiBold from './fonts/OpenSans/OpenSans-SemiBold.ttf';
import openSansBold from './fonts/OpenSans/OpenSans-Bold.ttf';
import openSansExtraBold from './fonts/OpenSans/OpenSans-ExtraBold.ttf';
import './App.css';

const GUI_TEMPLATE_NAME = 'quixoteGui';
const REGULAR_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-Regular'[^}]*\}\}[^>]*>\s*\{`([\s\S]*?)`\}\s*<\/Text>/g;
const SEMIBOLD_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-SemiBold'[^}]*\}\}[^>]*>\s*([\s\S]*?)\s*<\/Text>/g;
const BOLD_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-Bold'[^}]*\}\}[^>]*>\s*([\s\S]*?)\s*<\/Text>/g;
const ARROW_TOKEN = '__GUI_ARROW_TOKEN__';
const PDF_GENERATION_DEBOUNCE_MS = 450;

const cleanLabelText = (value) => (
  value
    .replace(/\{\s*'\\s*'\s*\}/g, ' ')
    .replace(/\{\s*"\\s*"\s*\}/g, ' ')
    .replace(/^\s*\[word\]\}>\s*/i, '')
    .replace(/^\s*\[[^\]]+\]\}>\s*/i, '')
    .replace(/\s*\[[^\]]+\]\}>\s*/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/:$/, '')
);

const normalizeContextForLabelMatching = (value) => value.replace(/=>/g, ARROW_TOKEN);

const getLastLabelFromContext = (context, pattern) => {
  let label = '';
  let match = pattern.exec(context);

  while (match) {
    const candidate = cleanLabelText(match[1] || '');
    if (candidate) {
      label = candidate;
    }
    match = pattern.exec(context);
  }

  return label;
};

const getFirstLabelFromContext = (context, pattern) => {
  const match = pattern.exec(context);
  if (!match) {
    return '';
  }

  return cleanLabelText(match[1] || '');
};

const extractGuiFieldsFromCode = (codeString) => {
  REGULAR_TEXT_PATTERN.lastIndex = 0;
  const fields = [];
  let match = REGULAR_TEXT_PATTERN.exec(codeString);

  while (match) {
    const value = match[1] || '';
    const contextBefore = normalizeContextForLabelMatching(
      codeString.slice(Math.max(0, match.index - 1800), match.index)
    );
    const contextAfter = normalizeContextForLabelMatching(
      codeString.slice(match.index, Math.min(codeString.length, match.index + 700))
    );
    const semiBoldPattern = new RegExp(SEMIBOLD_TEXT_PATTERN.source, 'g');
    const boldPattern = new RegExp(BOLD_TEXT_PATTERN.source, 'g');
    const semiBoldPatternForward = new RegExp(SEMIBOLD_TEXT_PATTERN.source, 'g');
    const boldPatternForward = new RegExp(BOLD_TEXT_PATTERN.source, 'g');

    const label = (
      getLastLabelFromContext(contextBefore, semiBoldPattern) ||
      getLastLabelFromContext(contextBefore, boldPattern) ||
      getFirstLabelFromContext(contextAfter, semiBoldPatternForward) ||
      getFirstLabelFromContext(contextAfter, boldPatternForward) ||
      `Field ${fields.length + 1}`
    );

    fields.push({
      id: `gui-field-${fields.length}`,
      label,
      value,
      multiline: value.includes('\n') || value.length > 120,
    });

    match = REGULAR_TEXT_PATTERN.exec(codeString);
  }

  const labelCounts = {};
  return fields.map((field) => {
    labelCounts[field.label] = (labelCounts[field.label] || 0) + 1;
    if (labelCounts[field.label] === 1) {
      return field;
    }

    return {
      ...field,
      label: `${field.label} ${labelCounts[field.label]}`,
    };
  });
};

const applyGuiFieldValuesToCode = (codeString, fields) => {
  REGULAR_TEXT_PATTERN.lastIndex = 0;
  let index = 0;

  return codeString.replace(REGULAR_TEXT_PATTERN, (fullMatch, existingValue) => {
    const replacementValue = fields[index]?.value ?? existingValue;
    index += 1;

    const escapedValue = replacementValue
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');

    return fullMatch.replace(`{\`${existingValue}\`}`, `{\`${escapedValue}\`}`);
  });
};

const resizeTextareaToContent = (textarea) => {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

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
  family: 'OpenSans-Light',
  src: openSansLight
});

Font.register({
  family: 'OpenSans-Regular',
  src: openSansRegular
});

Font.register({
  family: 'OpenSans-Medium',
  src: openSansMedium
});

Font.register({
  family: 'OpenSans-SemiBold',
  src: openSansSemiBold
});

Font.register({
  family: 'OpenSans-Bold',
  src: openSansBold
});

Font.register({
  family: 'OpenSans-ExtraBold',
  src: openSansExtraBold
});

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('quixote');
  const [code, setCode] = useState(() => templates.quixote);
  const [isGuiMode, setIsGuiMode] = useState(false);
  const [guiFields, setGuiFields] = useState([]);
  const [documentComponent, setDocumentComponent] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [saveMessage, setSaveMessage] = useState('');
  const previewContainerRef = useRef(null);
  const pdfViewerContainerRef = useRef(null);
  const pageElementsRef = useRef(new Map());
  const pendingScrollRestoreRef = useRef(null);
  const renderedPagesRef = useRef(new Set());
  const expectedPageCountRef = useRef(0);
  const restoreAnimationFrameRef = useRef(null);
  const generationRef = useRef(0);
  const isGuiTemplate = selectedTemplate === GUI_TEMPLATE_NAME;

  const getScrollContainer = () => pdfViewerContainerRef.current || previewContainerRef.current;

  const captureScrollAnchor = () => {
    const container = getScrollContainer();
    if (!container) return;

    const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);
    const scrollPercentage = maxScrollTop > 0 ? container.scrollTop / maxScrollTop : 0;

    const pageEntries = Array.from(pageElementsRef.current.entries())
      .filter(([, element]) => element)
      .sort(([a], [b]) => a - b);

    let anchorPageNumber = 1;
    let anchorOffsetRatio = 0;

    if (pageEntries.length > 0) {
      const viewportTop = container.getBoundingClientRect().top;
      let selected = pageEntries[0];

      for (const entry of pageEntries) {
        const rect = entry[1].getBoundingClientRect();
        if (rect.bottom > viewportTop + 1) {
          selected = entry;
          break;
        }
      }

      anchorPageNumber = selected[0];
      const selectedRect = selected[1].getBoundingClientRect();
      const pageHeight = selectedRect.height || 1;
      const scrolledIntoPage = Math.max(viewportTop - selectedRect.top, 0);
      anchorOffsetRatio = Math.min(scrolledIntoPage / pageHeight, 1);
    }

    pendingScrollRestoreRef.current = {
      anchorPageNumber,
      anchorOffsetRatio,
      scrollPercentage,
    };
  };

  const restoreScrollAnchor = () => {
    const anchor = pendingScrollRestoreRef.current;
    const container = getScrollContainer();
    if (!anchor || !container) return;

    if (restoreAnimationFrameRef.current) {
      cancelAnimationFrame(restoreAnimationFrameRef.current);
    }

    restoreAnimationFrameRef.current = requestAnimationFrame(() => {
      const anchoredPageElement = pageElementsRef.current.get(anchor.anchorPageNumber);
      const maxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);

      if (anchoredPageElement) {
        const targetTop = anchoredPageElement.offsetTop + (anchoredPageElement.clientHeight * anchor.anchorOffsetRatio);
        container.scrollTop = Math.min(Math.max(targetTop, 0), maxScrollTop);
      } else {
        container.scrollTop = Math.min(Math.max(maxScrollTop * anchor.scrollPercentage, 0), maxScrollTop);
      }

      restoreAnimationFrameRef.current = requestAnimationFrame(() => {
        const recalculatedMaxScrollTop = Math.max(container.scrollHeight - container.clientHeight, 0);
        const fallbackScrollTop = Math.min(
          Math.max(recalculatedMaxScrollTop * anchor.scrollPercentage, 0),
          recalculatedMaxScrollTop
        );

        if (!anchoredPageElement) {
          container.scrollTop = fallbackScrollTop;
        }

        pendingScrollRestoreRef.current = null;
        restoreAnimationFrameRef.current = null;
      });
    });
  };

  const handlePageRenderSuccess = (pageNumber) => {
    renderedPagesRef.current.add(pageNumber);

    if (
      pendingScrollRestoreRef.current &&
      expectedPageCountRef.current > 0 &&
      renderedPagesRef.current.size >= expectedPageCountRef.current
    ) {
      restoreScrollAnchor();
    }
  };

  useEffect(() => () => {
    if (restoreAnimationFrameRef.current) {
      cancelAnimationFrame(restoreAnimationFrameRef.current);
    }
  }, []);

  // Function to generate PDF blob from component
  const generatePDF = async (component) => {
    try {
      if (!component) return;
      const generation = generationRef.current + 1;
      generationRef.current = generation;

      console.log('Generating PDF for component:', component);
      const blob = await pdf(React.createElement(component)).toBlob();
      if (generation !== generationRef.current) {
        return;
      }
      console.log('PDF blob generated successfully:', blob);
      if (pdfBlob) {
        captureScrollAnchor();
      }
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
      const timeoutId = setTimeout(() => {
        generatePDF(documentComponent);
      }, PDF_GENERATION_DEBOUNCE_MS);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [documentComponent, error]);

  // Keyboard shortcuts for zoom controls
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoom]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleRunCode = () => {
    evaluateCode(code);
  };

  const handleSaveCode = async () => {
    try {
      const response = await fetch('/api/save-template-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, templateName: selectedTemplate }),
      });

      if (!response.ok) {
        let details = '';
        try {
          const payload = await response.json();
          details = payload?.error ? ` ${payload.error}` : '';
        } catch {
          details = '';
        }
        throw new Error(`Failed to write src/templates.js.${details}`.trim());
      }

      setSaveMessage(`Saved "${selectedTemplate}" + src/templates.js`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save code to src/templates.js.';
      setError(message);
      setSaveMessage('Save failed');
    }

    setTimeout(() => setSaveMessage(''), 2500);
  };

  const handleClearCode = () => {
    setCode(templates[selectedTemplate] || templates.quixote);
    setIsGuiMode(false);
    setSaveMessage('');
  };

  const handleTemplateChange = (templateName) => {
    setCode(templates[templateName]);
    setSelectedTemplate(templateName);
    setIsGuiMode(false);
    setSaveMessage('');
  };

  const handleGuiModeToggle = () => {
    if (!isGuiTemplate) return;
    setIsGuiMode((prev) => !prev);
  };

  const handleGuiFieldChange = (fieldId, value) => {
    setGuiFields((previousFields) => {
      const nextFields = previousFields.map((field) => (
        field.id === fieldId ? { ...field, value } : field
      ));

      setCode((previousCode) => applyGuiFieldValuesToCode(previousCode, nextFields));
      return nextFields;
    });
  };

  useEffect(() => {
    if (!isGuiTemplate) {
      setGuiFields([]);
      return;
    }

    setGuiFields(extractGuiFieldsFromCode(code));
  }, [code, isGuiTemplate]);

  useEffect(() => {
    if (!(isGuiMode && isGuiTemplate)) return;

    const textareas = document.querySelectorAll('.gui-field-textarea');
    textareas.forEach((textarea) => resizeTextareaToContent(textarea));
  }, [guiFields, isGuiMode, isGuiTemplate]);

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
            <option value="quixoteGui">Don Quixote (GUI Mode)</option>
            <option value="simple">Simple Document</option>
            <option value="resume">Resume</option>
            <option value="invoice">Invoice</option>
            <option value="multipage">Multi-page Example</option>
          </select>
          <button className="btn btn-primary" onClick={handleRunCode}>
            Run Code
          </button>
          <button className="btn btn-primary" onClick={handleSaveCode}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleClearCode}>
            Reset
          </button>
          {saveMessage && <span className="language-tag">{saveMessage}</span>}
        </div>
      </header>

      <div className="main-content">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>Code Editor</h2>
            <div className="panel-actions">
              <button
                className={`btn ${isGuiMode ? 'btn-primary' : 'btn-secondary'}`}
                onClick={handleGuiModeToggle}
                disabled={!isGuiTemplate}
                title={isGuiTemplate ? 'Toggle GUI mode' : 'GUI mode is only available for Don Quixote (GUI Mode)'}
              >
                GUI mode
              </button>
              <span className="language-tag">JavaScript</span>
            </div>
          </div>
          <div className="editor-container">
            {isGuiMode && isGuiTemplate ? (
              <div className="gui-mode-container">
                <div className="gui-mode-note">
                  Edit OpenSans-Regular values for this template.
                </div>
                {guiFields.map((field) => (
                  <label key={field.id} className="gui-field">
                    <span className="gui-field-label">{field.label}</span>
                    {field.multiline ? (
                      <textarea
                        className="gui-field-input gui-field-textarea"
                        rows={1}
                        value={field.value}
                        onInput={(e) => resizeTextareaToContent(e.target)}
                        onChange={(e) => handleGuiFieldChange(field.id, e.target.value)}
                      />
                    ) : (
                      <input
                        className="gui-field-input"
                        type="text"
                        value={field.value}
                        onChange={(e) => handleGuiFieldChange(field.id, e.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            ) : (
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
            )}
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
                </div>
              )}
            </div>
          </div>
          <div className="preview-container" ref={previewContainerRef}>
            {pdfBlob ? (
              <div className="pdf-viewer-container" ref={pdfViewerContainerRef}>
                <Document
                  file={pdfBlob}
                  onLoadSuccess={({ numPages }) => {
                    console.log('PDF loaded successfully, pages:', numPages);
                    pageElementsRef.current.clear();
                    renderedPagesRef.current.clear();
                    expectedPageCountRef.current = numPages;
                    setNumPages(numPages);
                    setError(null); // Clear any previous errors
                  }}
                  onLoadError={(error) => {
                    console.error('PDF load error:', error);
                    setError('Failed to load PDF: ' + error.message);
                  }}
                  loading={null}
                  error={
                    <div className="error-display">
                      <h3>Failed to load PDF</h3>
                      <p>There was an error loading the PDF document.</p>
                    </div>
                  }
                >
                  {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      inputRef={(node) => {
                        if (node) {
                          pageElementsRef.current.set(index + 1, node);
                        } else {
                          pageElementsRef.current.delete(index + 1);
                        }
                      }}
                      onRenderSuccess={() => handlePageRenderSuccess(index + 1)}
                      width={calculatePDFWidth()}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="pdf-page"
                    />
                  ))}
                </Document>
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
