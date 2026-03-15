import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const templateFilePath = resolve(__dirname, 'src/template.js')

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
              if (typeof parsed.code !== 'string') {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: false, error: 'Invalid payload: code must be a string.' }))
                return
              }

              await writeFile(templateFilePath, parsed.code, 'utf8')

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true, filePath: 'src/template.js' }))
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
