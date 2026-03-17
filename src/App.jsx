import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Document as PDFDocument, Page as PDFPage, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import * as Babel from '@babel/standalone';
import { templates } from './templates';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import openSansLight from './fonts/OpenSans/OpenSans-Light.ttf';
import openSansRegular from './fonts/OpenSans/OpenSans-Regular.ttf';
import openSansMedium from './fonts/OpenSans/OpenSans-Medium.ttf';
import openSansSemiBold from './fonts/OpenSans/OpenSans-SemiBold.ttf';
import openSansBold from './fonts/OpenSans/OpenSans-Bold.ttf';
import openSansExtraBold from './fonts/OpenSans/OpenSans-ExtraBold.ttf';

const GUI_TEMPLATE_NAME = 'quixoteGui';
const REGULAR_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-Regular'[^}]*\}\}[^>]*>\s*\{`([\s\S]*?)`\}\s*<\/Text>/g;
const SEMIBOLD_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-SemiBold'[^}]*\}\}[^>]*>\s*([\s\S]*?)\s*<\/Text>/g;
const BOLD_TEXT_PATTERN = /<Text style=\{\{[^}]*fontFamily:\s*'OpenSans-Bold'[^}]*\}\}[^>]*>\s*([\s\S]*?)\s*<\/Text>/g;
const ARROW_TOKEN = '__GUI_ARROW_TOKEN__';
const PDF_GENERATION_DEBOUNCE_MS = 450;
const GUI_HIDDEN_LABEL_PATTERNS = [
  /^revision no$/,
  /^estado$/,
  /^especialidad\(es\)$/,
  /^valoracion ram$/,
  /^fecha de elaboracion$/,
];

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

const removeDuplicateSuffix = (label) => label.replace(/\s+\d+$/, '');

const normalizeLabel = (label) => (
  removeDuplicateSuffix(label)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
);

const isHiddenGuiLabel = (label) => {
  const normalized = normalizeLabel(label);
  return GUI_HIDDEN_LABEL_PATTERNS.some((pattern) => pattern.test(normalized));
};

const findNthField = (fields, matcher, occurrence = 1) => {
  let count = 0;
  for (const field of fields) {
    const normalized = normalizeLabel(field.label);
    if (!matcher.test(normalized)) continue;
    count += 1;
    if (count === occurrence) {
      return field;
    }
  }

  return null;
};

const cleanGuiDisplayLabel = (label) => (
  removeDuplicateSuffix(label)
    .replace(/\(es\)/gi, '')
    .replace(/\(s\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
);

const buildGuiLayout = (fields) => {
  const visibleFields = fields.filter((field) => !isHiddenGuiLabel(field.label));
  const pick = (pattern, occurrence = 1) => findNthField(visibleFields, pattern, occurrence);

  return {
    topRows: [
      { fields: [pick(/descripcion del alcance/)], columns: 1 },
      { fields: [pick(/^unidad/), pick(/dirigido a/)], columns: 2 },
      { fields: [pick(/tag.*equipos.*intervenir/), pick(/^servicio/)], columns: 2 },
      { fields: [pick(/proceso de gestion de activos/), pick(/tipo de rt/)], columns: 2 },
      { fields: [pick(/numero.*aviso.*sap/), pick(/fecha requerida de ejecucion/)], columns: 2 },
    ],
    antecedenteRows: [
      { fields: [pick(/^diseno$/)], columns: 1 },
      { fields: [pick(/^antecedentes$/)], columns: 1 },
      { fields: [pick(/origen.*priorizacion/)], columns: 1 },
    ],
    diagnosticoField: pick(/^diagnostico 1$/),
    actionOneRows: [
      { fields: [pick(/titulo de la accion/, 1)], columns: 1 },
      { fields: [pick(/componente a intervenir/, 1), pick(/^especialidad$/, 1)], columns: 2 },
      { fields: [pick(/detalle de la accion/, 1)], columns: 1 },
      { fields: [pick(/listado de materiales/, 1)], columns: 1 },
      { fields: [pick(/controles de calidad/, 1)], columns: 1 },
    ],
    actionTwoRows: [
      { fields: [pick(/titulo de la accion/, 2)], columns: 1 },
      { fields: [pick(/componente a intervenir/, 2), pick(/^especialidad$/, 2)], columns: 2 },
      { fields: [pick(/detalle de la accion/, 2)], columns: 1 },
      { fields: [pick(/listado de materiales/, 2)], columns: 1 },
      { fields: [pick(/controles de calidad/, 2)], columns: 1 },
    ],
    controlCalidadField: pick(/control de calidad requerido/),
    elaboroField: pick(/^elaboro$/),
  };
};

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

  const guiLayout = buildGuiLayout(guiFields);

  const renderGuiInput = (field) => {
    if (!field) return null;

    const labelText = cleanGuiDisplayLabel(field.label);
    const useTextarea = field.multiline || field.value.length > 90;

    return (
      <label key={field.id} className="flex flex-col">
        <span className="border-b border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
          {labelText}
        </span>
        {useTextarea ? (
          <Textarea
            className="gui-field-textarea min-h-[90px] w-full resize-none bg-white px-2 py-2 text-sm text-slate-900 outline-none ring-inset focus:ring-1 focus:ring-sky-500"
            rows={1}
            value={field.value}
            onInput={(e) => resizeTextareaToContent(e.target)}
            onChange={(e) => handleGuiFieldChange(field.id, e.target.value)}
          />
        ) : (
          <Input
            className="w-full bg-white px-2 py-2 text-sm text-slate-900 outline-none ring-inset focus:ring-1 focus:ring-sky-500"
            type="text"
            value={field.value}
            onChange={(e) => handleGuiFieldChange(field.id, e.target.value)}
          />
        )}
      </label>
    );
  };

  const renderGuiRows = (rows) => rows
    .filter((row) => row.fields.some(Boolean))
    .map((row, rowIndex) => (
      <div
        key={`gui-row-${rowIndex}`}
        className={`grid border border-slate-700 border-b-0 bg-slate-900 ${row.columns === 2 ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}
      >
        {row.fields.map((field, index) => {
          const isLastCell = index === row.fields.length - 1;
          return (
            <div
              key={`${field?.id || `empty-${index}`}`}
              className={`min-w-0 border-slate-700 ${isLastCell ? '' : 'xl:border-r'} ${isLastCell ? '' : 'border-b xl:border-b-0'}`}
            >
              {field ? renderGuiInput(field) : null}
            </div>
          );
        })}
      </div>
    ));

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
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold">React-PDF Playground</h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Choose template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quixote">Don Quixote</SelectItem>
              <SelectItem value="quixoteGui">Don Quixote (GUI Mode)</SelectItem>
              <SelectItem value="simple">Simple Document</SelectItem>
              <SelectItem value="resume">Resume</SelectItem>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="multipage">Multi-page Example</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRunCode}>
            Run Code
          </Button>
          <Button onClick={handleSaveCode}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClearCode}>
            Reset
          </Button>
          {saveMessage && <Badge>{saveMessage}</Badge>}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Card className="m-2 flex min-h-0 w-full flex-col overflow-hidden border-slate-800 md:w-1/2">
          <div className="flex min-h-[50px] items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
            <h2 className="text-sm font-medium text-slate-300">Code Editor</h2>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant={isGuiMode ? 'default' : 'secondary'}
                onClick={handleGuiModeToggle}
                disabled={!isGuiTemplate}
                title={isGuiTemplate ? 'Toggle GUI mode' : 'GUI mode is only available for Don Quixote (GUI Mode)'}
              >
                GUI mode
              </Button>
              <Badge>JavaScript</Badge>
            </div>
          </div>
          <div className="editor-container relative flex-1 overflow-auto bg-slate-950">
            {isGuiMode && isGuiTemplate ? (
              <div className="h-full overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 p-4">
                <div className="mb-3 text-sm text-slate-400">
                  Editable fields arranged as RT sections.
                </div>
                <div>
                  {renderGuiRows(guiLayout.topRows)}

                  <h3 className="mt-4 border-b border-slate-700 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">ANTECEDENTE</h3>
                  {renderGuiRows(guiLayout.antecedenteRows)}

                  <h3 className="mt-4 border-b border-slate-700 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">DIAGNOSTICO 1</h3>
                  {guiLayout.diagnosticoField && (
                    <div className="grid grid-cols-1 border border-slate-700 border-b-0 bg-slate-900">
                      <div className="min-w-0">
                        {renderGuiInput(guiLayout.diagnosticoField)}
                      </div>
                    </div>
                  )}

                  <h3 className="mt-4 border-b border-slate-700 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">ACCION RECOMENDADA 1</h3>
                  {renderGuiRows(guiLayout.actionOneRows)}

                  <h3 className="mt-4 border-b border-slate-700 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">ACCION RECOMENDADA 2</h3>
                  {renderGuiRows(guiLayout.actionTwoRows)}

                  <h3 className="mt-4 border-b border-slate-700 pb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">CONTROL DE CALIDAD REQUERIDO</h3>
                  {guiLayout.controlCalidadField && (
                    <div className="grid grid-cols-1 border border-slate-700 border-b-0 bg-slate-900">
                      <div className="min-w-0">
                        {renderGuiInput(guiLayout.controlCalidadField)}
                      </div>
                    </div>
                  )}

                  {guiLayout.elaboroField && (
                    <div className="grid grid-cols-1 border border-slate-700 border-b-0 bg-slate-900">
                      <div className="min-w-0">
                        {renderGuiInput(guiLayout.elaboroField)}
                      </div>
                    </div>
                  )}
                </div>
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
        </Card>
        <Card className="m-2 flex min-h-0 w-full flex-col overflow-hidden border-slate-800 md:w-1/2">
          <div className="flex min-h-[50px] items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
            <h2 className="text-sm font-medium text-slate-300">PDF Preview</h2>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {error && <Badge variant="destructive" className="max-w-[220px] truncate">Error: {error}</Badge>}
              {!error && documentComponent && (
                <div className="flex items-center gap-2 rounded bg-emerald-600 px-2 py-1 text-xs font-medium text-white">
                  <span>✓ PDF Generated</span>
                  <Button size="sm" variant="outline" className="border-emerald-300 bg-emerald-500 text-white hover:bg-emerald-400" onClick={handleDownload} disabled={!pdfBlob}>
                    Download PDF
                  </Button>
                </div>
              )}
              {pdfBlob && !error && (
                <div className="ml-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleZoomOut} disabled={zoom <= 0.4}>
                      −
                    </Button>
                    <span className="min-w-10 text-center text-xs text-slate-300">{Math.round(zoom * 100)}%</span>
                    <Button size="sm" onClick={handleZoomIn} disabled={zoom >= 3.0}>
                      +
                    </Button>
                    <Button size="sm" onClick={handleZoomFit}>
                      Fit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex-1 overflow-auto bg-slate-100" ref={previewContainerRef}>
            {pdfBlob ? (
              <div className="flex h-full items-start justify-center overflow-auto bg-slate-200 p-4" ref={pdfViewerContainerRef}>
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
                    <div className="m-4 max-w-[500px] rounded-lg border border-red-300 bg-red-50 p-6 text-center md:m-2">
                      <h3 className="mb-4 text-xl text-red-700">Failed to load PDF</h3>
                      <p className="mt-2 text-slate-600">There was an error loading the PDF document.</p>
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
                      style={{
                        marginBottom: '1rem',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px',
                        backgroundColor: 'transparent',
                      }}
                    />
                  ))}
                </Document>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-8 text-slate-600">
                {error ? (
                  <div className="m-4 max-w-[500px] rounded-lg border border-red-300 bg-red-50 p-6 text-center md:m-2">
                    <h3 className="mb-4 text-xl text-red-700">Error in code:</h3>
                    <pre className="my-4 overflow-x-auto whitespace-pre-wrap rounded bg-red-500 p-4 text-left text-sm text-white">{error}</pre>
                    <p className="mt-2 text-slate-600">Please check your code and try again.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-lg text-slate-600">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600"></div>
                    <p>Generating PDF...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
