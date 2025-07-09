// Example React-PDF templates
// Copy and paste these into the playground to test different features

// Template 1: Basic Document
export const basicDocument = `
// Basic Document Template
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 1.5,
    marginBottom: 10,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>My First PDF</Text>
      <Text style={styles.text}>
        This is a basic PDF document created with React-PDF. 
        You can add text, formatting, and much more!
      </Text>
    </Page>
  </Document>
);

export default MyDocument;
`;

// Template 2: Document with Table
export const tableDocument = `
// Document with Table Template
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: "table",
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
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0'
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCellHeader: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold'
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  }
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Sales Report</Text>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Product</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Widget A</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$10.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>5</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$50.00</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Widget B</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$15.00</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>$45.00</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
`;

// Template 3: Invoice Template
export const invoiceDocument = `
// Invoice Template
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flexDirection: 'column',
    width: '48%',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}>Invoice #001</Text>
        </View>
        <View>
          <Text style={styles.text}>Date: January 15, 2024</Text>
          <Text style={styles.text}>Due Date: February 15, 2024</Text>
        </View>
      </View>

      <View style={styles.invoiceInfo}>
        <View style={styles.column}>
          <Text style={styles.label}>Bill To:</Text>
          <Text style={styles.text}>John Doe</Text>
          <Text style={styles.text}>123 Main Street</Text>
          <Text style={styles.text}>City, State 12345</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.text}>Your Company</Text>
          <Text style={styles.text}>456 Business Ave</Text>
          <Text style={styles.text}>Business City, State 67890</Text>
        </View>
      </View>

      <Text style={styles.label}>Services:</Text>
      <Text style={styles.text}>• Web Development - $1,500.00</Text>
      <Text style={styles.text}>• Design Services - $800.00</Text>
      <Text style={styles.text}>• Consulting - $300.00</Text>

      <Text style={styles.total}>Total: $2,600.00</Text>
    </Page>
  </Document>
);

export default MyDocument;
`;
