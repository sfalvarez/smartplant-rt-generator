// Template examples for the React-PDF playground

export const templates = {
  quixote: `// Don Quixote Example - Table with Images
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    width: 150,
    height: 200,
  },
  cellImage: {
    width: '60%',
    height: 80,
    marginVertical: 5,
    alignSelf: 'center'
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 10
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center'
  }
});

const Quixote = () => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop"
      />

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Some text before the image.</Text>
            <Image
              style={styles.cellImage}
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=80&fit=crop"
            />
            <Text style={styles.tableCell}>Some text after the image.</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 1, Col 2</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 2, Col 2</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 3, Col 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Row 3, Col 2</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D. Quijote de la Mancha
      </Text>
      <Text style={styles.text}>
        En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.
      </Text>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        \`\${pageNumber} / \${totalPages}\`
      )} fixed />
    </Page>
  </Document>
);

ReactPDF.render(<Quixote />);`,

  simple: `// Simple Document Example
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
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
      <View style={styles.section}>
        <Text style={styles.title}>Hello World!</Text>
        <Text style={styles.text}>
          This is a simple PDF document created with React-PDF.
        </Text>
        <Text style={styles.text}>
          You can edit this code to create your own PDF documents.
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);`,

  resume: `// Resume Example
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E86AB',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2E86AB',
    borderBottomWidth: 1,
    borderBottomColor: '#2E86AB',
    paddingBottom: 3,
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
    textAlign: 'justify',
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  contact: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
  }
});

const Resume = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>John Doe</Text>
      <Text style={styles.contact}>
        john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        <Text style={styles.boldText}>Senior Software Engineer</Text>
        <Text style={styles.text}>
          Tech Company Inc. | 2020 - Present
        </Text>
        <Text style={styles.text}>
          • Led development of web applications using React and Node.js
        </Text>
        <Text style={styles.text}>
          • Improved application performance by 40% through optimization
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <Text style={styles.boldText}>Bachelor of Science in Computer Science</Text>
        <Text style={styles.text}>
          University Name | 2016 - 2020
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <Text style={styles.text}>
          JavaScript, React, Node.js, Python, SQL, Git, Docker
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<Resume />);`,

  invoice: `// Invoice Example
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#2E86AB',
  },
  invoiceNumber: {
    fontSize: 14,
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 11,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  }
});

const Invoice = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.invoiceNumber}>
          Invoice #: 2024-001
        </Text>
        <Text style={styles.invoiceNumber}>
          Date: {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Bill To:</Text>
        <Text style={styles.value}>Client Name</Text>
        <Text style={styles.value}>123 Client Street</Text>
        <Text style={styles.value}>City, State 12345</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Description</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Rate</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
        </View>
        
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Web Development</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>40</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$50.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$2,000.00</Text>
          </View>
        </View>
        
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Consulting</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>10</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$75.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$750.00</Text>
          </View>
        </View>
      </View>

      <Text style={styles.total}>
        Total: $2,750.00
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<Invoice />);`,

  multipage: `// Multi-page Document Example
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E86AB',
  },
  chapter: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 1.4,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#666',
  }
});

const MultiPageDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Multi-Page Document</Text>
      <Text style={styles.chapter}>Chapter 1: Introduction</Text>
      <Text style={styles.text}>
        This is a multi-page document example that demonstrates the pagination controls in the React-PDF playground.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Text style={styles.text}>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </Text>
      <Text style={styles.text}>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => 
        \`Page \${pageNumber} of \${totalPages}\`
      } fixed />
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.chapter}>Chapter 2: Advanced Features</Text>
      <Text style={styles.text}>
        This second page demonstrates how the pagination controls work when you have multiple pages in your PDF document.
      </Text>
      <Text style={styles.text}>
        You can navigate between pages using the arrow buttons in the PDF viewer, or use the left/right arrow keys on your keyboard.
      </Text>
      <Text style={styles.text}>
        The zoom functionality also works across all pages, allowing you to zoom in and out while maintaining your current page position.
      </Text>
      <Text style={styles.text}>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
      </Text>
      <Text style={styles.text}>
        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => 
        \`Page \${pageNumber} of \${totalPages}\`
      } fixed />
    </Page>
    
    <Page size="A4" style={styles.page}>
      <Text style={styles.chapter}>Chapter 3: Conclusion</Text>
      <Text style={styles.text}>
        This final page concludes our multi-page document example. You now have a working pagination system!
      </Text>
      <Text style={styles.text}>
        The React-PDF playground provides a complete development environment for creating and testing PDF documents with real-time preview capabilities.
      </Text>
      <Text style={styles.text}>
        Features include:
      </Text>
      <Text style={styles.text}>
        • Real-time PDF generation and preview
      </Text>
      <Text style={styles.text}>
        • Zoom controls (40% to 300%)
      </Text>
      <Text style={styles.text}>
        • Page navigation for multi-page documents
      </Text>
      <Text style={styles.text}>
        • Keyboard shortcuts for improved workflow
      </Text>
      <Text style={styles.text}>
        • Multiple pre-built templates
      </Text>
      <Text style={styles.text}>
        • Download functionality
      </Text>
      <Text style={styles.text}>
        • Monaco Editor with syntax highlighting
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => 
        \`Page \${pageNumber} of \${totalPages}\`
      } fixed />
    </Page>
  </Document>
);

ReactPDF.render(<MultiPageDoc />);`
};
