// Template examples for the React-PDF playground

const quixoteTemplate = `// Don Quixote Example - Table with Images
const styles = StyleSheet.create({
  pageNumber: {
    position: 'absolute',
    top: '9mm',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  body: {
    paddingTop: '16mm',
    paddingBottom: '10mm',
    paddingRight: '10mm',
    paddingLeft: '10mm',
    fontSize: 12,
    textAlign: 'left',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableCell: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    margin: 0,
    paddingTop: 1,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
  },
});

const Quixote = () => (
  <Document>
    <Page size="LETTER" style={styles.body}>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          'RT-GRB-00000 Revisión 0                                                                                                         Página ' + pageNumber + ' / ' + totalPages
        }
        fixed
      />

      <View style={styles.table}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ flex: 1, justifyContent: 'center', alignItems: 'center' } }}>
            <Image style={{ width: '5cm' }} src="/images/logo-ecopetrol.png" />
          </View>
          <View style={{ width: '70%', flexDirection: 'column' }}>
            <View style={styles.tableCell}>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                FORMATO RECOMENDACIÓN TÉCNICA
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                GERENCIA REFINERÍA BARRANCABERMEJA
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                GERENCIA TÉCNICA
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Encabezado */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16.65%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }}>
              RT-GRB-00000
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '16.8%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Revisión No:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`0\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Estado:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Publicado\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Unidad(es):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`4200 - Unidad Cracking UOP II\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Fecha requerida de ejecución:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`14/06/2025\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Dirigido a:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Departamento de Cracking Catalítico II\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Servicio(s):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Vapor\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Tag(s) de los equipos a intervenir:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`SLC420023GR01 / SLC420022GR01 / SLC420021GR01\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Proceso de Gestión de Activos (PGA):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Mantenimiento Mayor\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '25%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Tipo de RT:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Emergente\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '25%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Especialidad(es):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`MEE\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Valoración RAM:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`M\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Número(s) de aviso(s) SAP:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`200421332\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Descripción del alcance:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Corrección de fugas de vapor por válvulas, tuberías, juntas soldadas y juntas bridadas\`}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Antecedentes */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Bold' }}>
              ANTECEDENTE
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
              Diseño
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: 11 }}>
              {\`Año de fabricación: 2004\`}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
              Antecedentes
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }}>
              {\`Origen, 
valoración 
y priorización 
de la tarea de
mantenimiento\`}
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Publicado\`}
            </Text>
          </View>
        </View>
      </View>


            {/* Diagnóstico */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Bold' }}>
              DIAGNÓSTICO 1
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Fuga por unión bridada del drenaje del filtro de admisión de vapor de la NP-4432B y asociado a la XV-44305.
Esta unión bridada recibió mantenimiento por parte de Italco contemplado en el alcance del equipo
rotativo, por lo cual debe normalizarse el hallazgo con el cambio de empaque y apriete de la junta bridada.\`}
            </Text>
          </View>
        </View>

        {/* Acción 1 */}
        <View style={{flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                ACCIÓN RECOMENDADA 1
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ ...styles.tableCell, ...{ width: '34%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Título de la acción:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Mantenimiento general y reentube del haz\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Componente a intervenir:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Haz y partes del E4533\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ width: '33%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Especialidad:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`MEE, Mecánica Estática\`}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Detalle de la acción
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Listado de materiales y/o repuestos
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Los referenciados en las acciones\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Controles de calidad / Estándar de evaluación
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`V°B° por parte del CIIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansión de tubería del haz.
Procedimiento de torque y apriete de uniones bridadas.\`}
              </Text>
            </View>
          </View>

        </View> 

        {/* Acción 2 */}
        <View style={{flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                ACCIÓN RECOMENDADA 2
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ ...styles.tableCell, ...{ width: '34%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Título de la acción:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Mantenimiento general y reentube del haz\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Componente a intervenir:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Haz y partes del E4533\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ width: '33%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Especialidad:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`MEE, Mecánica Estática\`}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Detalle de la acción
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Listado de materiales y/o repuestos
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Los referenciados en las acciones\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Controles de calidad / Estándar de evaluación
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`V°B° por parte del CIIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansión de tubería del haz.
Procedimiento de torque y apriete de uniones bridadas.\`}
              </Text>
            </View>
          </View>
        </View> 
      </View>

      {/* Diagnóstico */}
        <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                CONTROL DE CALIDAD REQUERIDO
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`V°B° por parte del CIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansion de tubería del haz.\`}
              </Text>
            </View>
          </View>
        </View>

      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ ...styles.tableCell, ...{ width: '60%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Elaboró:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Sergio Fabián Álvarez Gómez (registro E0301524), Felipe Alejandro Real (Registro E0123456)\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Fecha de elaboración:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`15/03/2026\`}
              </Text>
            </Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

ReactPDF.render(<Quixote />);`;

const quixoteGuiTemplate = `// Don Quixote Example - Table with Images
const styles = StyleSheet.create({
  pageNumber: {
    position: 'absolute',
    top: '9mm',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  body: {
    paddingTop: '16mm',
    paddingBottom: '10mm',
    paddingRight: '10mm',
    paddingLeft: '10mm',
    fontSize: 12,
    textAlign: 'left',
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableCell: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    margin: 0,
    paddingTop: 1,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 3,
  },
});

const Quixote = () => (
  <Document>
    <Page size="LETTER" style={styles.body}>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          'RT-GRB-00006 Revisión 0                                                                                                         Página ' + pageNumber + ' / ' + totalPages
        }
        fixed
      />

      <View style={styles.table}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ flex: 1, justifyContent: 'center', alignItems: 'center' } }}>
            <Image style={{ width: '5cm' }} src="/images/logo-ecopetrol.png" />
          </View>
          <View style={{ width: '70%', flexDirection: 'column' }}>
            <View style={styles.tableCell}>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                FORMATO RECOMENDACIÓN TÉCNICA
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                GERENCIA REFINERÍA BARRANCABERMEJA
              </Text>
              <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center' }}>
                GERENCIA TÉCNICA
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Encabezado */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16.65%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }}>
              RT-GRB-00006
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '16.8%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Revisión No:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`1\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Estado:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Publicado\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Unidad(es):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`4200 - Unidad Cracking UOP II\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Fecha requerida de ejecución:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`30/04/2026\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Dirigido a:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Departamento de Craqueo Catalítico II-III\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Servicio(s):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Torre silenciadora\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Tag(s) de los equipos a intervenir:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`SSI4201\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Proceso de Gestión de Activos (PGA):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Mantenimiento Rutinario\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '25%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Tipo de RT:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Emergente\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '25%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Especialidad(es):
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`MEE\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Valoración RAM:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`M\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ width: '50%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Número(s) de aviso(s) SAP:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`\`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Descripción del alcance:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Corrección de fugas de vapor por válvulas, tuberías, juntas soldadas y juntas bridadas\`}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Antecedentes */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Bold' }}>
              ANTECEDENTE
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
              Diseño
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Año de fabricación: 2025\`}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
              Antecedentes
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} >
              {\`Origen, 
valoración y 
priorización 
de la tarea de
mantenimiento\`}
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Publicado\`}
            </Text>
          </View>
        </View>
      </View>


            {/* Diagnóstico */}
      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Bold' }}>
              DIAGNÓSTICO 1
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Fuga por unión bridada del drenaje del filtro de admisión de vapor de la NP-4432B y asociado a la XV-44305.
Esta unión bridada recibió mantenimiento por parte de Italco contemplado en el alcance del equipo
rotativo, por lo cual debe normalizarse el hallazgo con el cambio de empaque y apriete de la junta bridada.\`}
            </Text>
          </View>
        </View>

        {/* Acción 1 */}
        <View style={{flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                ACCIÓN RECOMENDADA 1
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ ...styles.tableCell, ...{ width: '34%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Título de la acción:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Mantenimiento general y reentube del haz\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Componente a intervenir:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Haz y partes del E4533\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ width: '33%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Especialidad:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`MEE, Mecánica Estática\`}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Detalle de la acción
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Listado de materiales y/o repuestos
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Los referenciados en las acciones\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '12.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Controles de calidad / Estándar de evaluación
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`V°B° por parte del CIIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansión de tubería del haz.
Procedimiento de torque y apriete de uniones bridadas.\`}
              </Text>
            </View>
          </View>

        </View> 

        {/* Acción 2 */}
        <View style={{flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                ACCIÓN RECOMENDADA 2
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ ...styles.tableCell, ...{ width: '34%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Título de la acción:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Mantenimiento general y reentube del haz\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Componente a intervenir:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`Haz y partes del E4532\`}
                </Text>
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ width: '33%' } }}>
              <Text hyphenationCallback={(word) => [word]}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                  Especialidad:
                </Text>
                {' '}
                <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                  {\`MEE, Mecánica Estática\`}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Detalle de la acción
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`2019:
Durante la inspección de la unidad en abril del año 2019, y luego de 17 años con agua en
lado TI, se realiza inspección mediante corrientes inducidas a la mitad de la tubería del haz
aproximadamente, encontrando la siguiente condición:
El haz se encontró en mal estado. Durante la reparación: se realizó limpieza a los tubos
interior y exteriormente. Mecanismos de daño: corrosión interna y externa. Como
producto de la inspección realizada al haz, se encontró:
a. Lado TI: picaduras pasantes.
b. Lado TO: corrosión general leve.
Se reentubó haz.\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Listado de materiales y/o repuestos
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Los referenciados en las acciones\`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '14.5%' } }}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} hyphenationCallback={(word) => [word]}>
                Controles de calidad / Estándar de evaluación
              </Text>
            </View>
            <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`V°B° por parte del CIIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansión de tubería del haz.
Procedimiento de torque y apriete de uniones bridadas.\`}
              </Text>
            </View>
          </View>
        </View> 
      </View>

      {/* Diagnóstico */}
        <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                CONTROL DE CALIDAD REQUERIDO
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ ...styles.tableCell, ...{ width: '100%' } }}>
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`V°B° por parte del CIE a los trabajos recomendados.
Realizar PH x T a 156 psig y PH x C a 215 psig
Mapa Expansion de tubería del haz.\`}
              </Text>
            </View>
          </View>
        </View>

      <View style={{ ...styles.table, ...{ marginTop: 15, flexDirection: 'column' } }}>
        <View style={{ flexDirection: 'row'}}>
          <View style={{ ...styles.tableCell, ...{ width: '60%' } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Elaboró:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`Sergio Fabián Álvarez Gómez (registro E0301524), Felipe Alejandro Real (Registro E0123456)\`}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text hyphenationCallback={(word) => [word]}>
              <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>
                Fecha de elaboración:
              </Text>
              {' '}
              <Text style={{ fontFamily: 'OpenSans-Regular' }}>
                {\`15/03/2026\`}
              </Text>
            </Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

ReactPDF.render(<Quixote />);`;

export const templates = {
  quixote: quixoteTemplate,
  quixoteGui: quixoteGuiTemplate,
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
