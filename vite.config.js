import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templateFilePath = resolve(__dirname, 'src/templates.js')

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const escapeTemplateLiteralContent = (value) => (
  value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
)

const replaceTemplateSource = (source, templateName, code) => {
  const escapedTemplateName = escapeRegExp(templateName)
  const entryRegex = new RegExp(`(${escapedTemplateName}\\s*:\\s*\`)([\\s\\S]*?)(\`,)`)

  if (!entryRegex.test(source)) {
    throw new Error(`Template "${templateName}" was not found in src/templates.js.`)
  }

  const escapedCode = escapeTemplateLiteralContent(code)
  return source.replace(entryRegex, `$1${escapedCode}$3`)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-template-file-api',
      configureServer(server) {
        server.middlewares.use('/api/save-template-file', (req, res, next) => {
          if (req.method !== 'POST') {
            return next()
          }

          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}')
              const { code, templateName } = parsed

              if (typeof code !== 'string') {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: false, error: 'Invalid payload: code must be a string.' }))
                return
              }

              if (typeof templateName !== 'string' || !templateName.trim()) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: false, error: 'Invalid payload: templateName must be a non-empty string.' }))
                return
              }

              const currentSource = await readFile(templateFilePath, 'utf8')
              const updatedSource = replaceTemplateSource(currentSource, templateName, code)

              await writeFile(templateFilePath, updatedSource, 'utf8')

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, filePath: 'src/templates.js', templateName }))
            } catch (error) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(
                JSON.stringify({
                  ok: false,
                  error: error instanceof Error ? error.message : 'Unknown error while saving template file.',
                })
              )
            }
          })

          req.on('error', (error) => {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : 'Failed to read request body.',
              })
            )
          })
        })
      },
    },
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['react-pdf', 'buffer']
  }
})
