import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const distPath = path.join(__dirname, '../dist')

if (fs.existsSync(distPath)) {
  console.log('Serving static files from dist folder')
  app.use(express.static(distPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  console.log('Dist folder not found. Serving a fallback message.')
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.send('<h1>Frontend not built. Contact the administrator.</h1>')
    } else {
      res.send('<h1>Frontend not built. Run npm run build in the client directory.</h1>')
    }
  })
}

app.get('/api/hola', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' })
})

app.post('/api/datos', (req, res) => {
  const datosRecibidos = req.body
  console.log('Datos recibidos del frontend:', datosRecibidos)
  res.json({ mensaje: 'Datos recibidos correctamente' })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
