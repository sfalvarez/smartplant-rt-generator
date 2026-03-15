// Don Quixote Example - Table with Images
const styles = StyleSheet.create({
    pageNumber: {
    position: 'absolute',
    fontSize: 12,
    top: '7mm',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  body: {
    paddingTop: '13mm',
    paddingBottom: '10mm',
    paddingRight: '10mm',
    paddingLeft: '10mm',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold'
  },
  subtitle: {
    fontSize: 18,
    margin: 0,
    fontFamily: 'OpenSans-Medium'
  },
  text: {
    margin: 0,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    width: "auto"
  }
});

const Quixote = () => (
  <Document>
    <Page size="LETTER" style={styles.body}>
    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `RT-GRB-00001 Revisión 0                                                Página ${pageNumber} / ${totalPages}`
      )} fixed />
      <View style={styles.table} fixed>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>    
            <View style={styles.tableCell}>       
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, textAlign: 'center', borderWidth: 1, borderColor: "red" }}>FORMATO RECOMENDACIÓN TÉCNICA</Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, textAlign: 'center', borderWidth: 1, borderColor: "blue" }}>GERENCIA REFINERÍA BARRANCABERMEJA</Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 12, textAlign: 'center', borderWidth: 1, borderColor: "yellow"  }}>GERENCIA TÉCNICA</Text>
            </View>
          </View>
          <View style={styles.tableCell}>
            <Image
              style={{ width: '4cm'}}
              src="/images/logo-ecopetrol.png" // Replace with your image source
            />
          </View>
        </View>
      </View>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop"
      />

      <View style={styles.table} fixed>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Image
              style={styles.cellImage}
              src="/images/logo-ecopetrol.png" // Replace with your image source
            />
          </View>
          <View style={styles.tableCol}>            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>FORMATO RECOMENDACIÓN TÉCNICA</Text>
            </View>
            <View>
              <Text style={styles.tableCell}>GERENCIA REFINERÍA BARRANCABERMEJA</Text>
              <Text style={styles.tableCell}>GERENCIA TÉCNICA</Text>
            </View>
          </View>
        </View>
      </View>
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
    </Page>
  </Document>
);

ReactPDF.render(<Quixote />);