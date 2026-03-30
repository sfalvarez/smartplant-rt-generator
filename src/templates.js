// Template examples for the React-PDF playground

const PlantillaRT = `// Plantilla RT
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

const PlantillaRT = () => (
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
                {\`Instalación de caja externa de refuerzo con refractario en el ducto de entrada de la torre silenciadora SSI4201 donde se presentan puntos calientes\`}
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
              {\`El proyecto de confiabilidad de UOP2, realizó instalacion de una nueva torre silenciadora en el sistema de flue gas cooler , con un rediseño total pasando de pared caliente a pared fria con refractario monolitico interno.\`}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.tableCell, ...{ width: '16%' } }}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold', textAlign: 'left' }} >
              Origen, 
valoración y 
priorización 
de la tarea de
mantenimiento
            </Text>
          </View>
          <View style={{ ...styles.tableCell, ...{ flex: 1 } }}>
            <Text style={{ fontFamily: 'OpenSans-Regular' }}>
              {\`Eliminación de riesgo a la disponibilidad operacional y \`}
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

ReactPDF.render(<PlantillaRT />);`;

export const templates = {
  PlantillaRT: PlantillaRT,
};
