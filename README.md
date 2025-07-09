# React-PDF Playground

A live React-PDF playground where you can experiment with PDF generation using React components. This application provides a split-screen interface with a code editor on the left and a live PDF preview on the right, similar to the official React-PDF playground.

## Features

- **Live Code Editor**: Monaco Editor with syntax highlighting and auto-completion
- **Real-time PDF Preview**: See your changes instantly as you type
- **Template Examples**: Pre-built templates including Don Quixote, Simple Document, Resume, and Invoice
- **React-PDF Components**: Full access to Document, Page, Text, View, StyleSheet, Font, and Image components
- **Error Handling**: Clear error messages when code has issues
- **VSCode Compatible**: Works in VS Code's Simple Browser
- **Responsive Design**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smartplant-rt-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## How to Use

1. **Template Selection**: Choose from pre-built templates using the dropdown
2. **Code Editor**: Write your React-PDF code in the left panel
3. **PDF Preview**: View the generated PDF in the right panel
4. **Run Code**: Click the "Run Code" button to manually trigger PDF generation
5. **Reset**: Click the "Reset" button to restore the default example

## Code Patterns

The playground supports two main patterns:

### 1. Component Export Pattern
```javascript
const MyDocument = () => (
  <Document>
    <Page>
      <Text>Hello World!</Text>
    </Page>
  </Document>
);

export default MyDocument;
```

### 2. ReactPDF.render() Pattern (Official Playground Compatible)
```javascript
const MyDocument = () => (
  <Document>
    <Page>
      <Text>Hello World!</Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
```

## React-PDF Components

The following components are available in the playground:

- `Document` - The root component for your PDF
- `Page` - Represents a page in the PDF
- `Text` - For displaying text content
- `View` - Container component for layouts
- `StyleSheet` - For creating styles
- `Font` - For registering custom fonts
- `Image` - For displaying images

## Example Templates

### Simple Document
```javascript
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 10,
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.text}>
        This is a simple PDF document created with React-PDF.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
```

### Working with Images
```javascript
const styles = StyleSheet.create({
  page: { padding: 30 },
  image: {
    width: 200,
    height: 150,
    marginVertical: 15,
  },
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <Image
        style={styles.image}
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop"
      />
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and development server
- **Monaco Editor** - Code editor component
- **@react-pdf/renderer** - PDF generation library
- **react-pdf** - PDF viewing component
- **@babel/standalone** - JavaScript/JSX transformation

## Troubleshooting

### PDF Not Loading
- Check that image URLs are accessible
- Ensure proper JSX syntax
- Verify that all React-PDF components are used correctly

### Editor Issues
- Make sure you're using proper JavaScript/JSX syntax
- Check the console for compilation errors
- Use the provided templates as starting points

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

export default MyDocument;
```

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **@react-pdf/renderer** - PDF generation library
- **Monaco Editor** - Code editor (VS Code's editor)
- **CSS3** - Styling

## Development

The project uses Vite for fast development and hot module replacement. The main components are:

- `src/App.jsx` - Main application component
- `src/App.css` - Application styles
- `src/main.jsx` - Application entry point

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the official React-PDF playground
- Built with React-PDF library by Diego Muracciole
- Uses Monaco Editor for the code editing experience
