const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000 // Usa la variable de entorno PORT o 3000 por defecto
const path = require('path')
const fs = require('fs')

app.use(cors()) // Habilita CORS para todas las rutas
app.use(express.json()) // Habilita el análisis de JSON en las solicitudes

// Comprobar si existe la carpeta 'dist'
const distPath = path.join(__dirname, '../dist')

if (fs.existsSync(distPath)) {
  console.log('Serving static files from dist folder')
  app.use(express.static(distPath))

  // Ruta comodín para Vue Router (solo si existe 'dist')
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  console.log('Dist folder not found. Serving a fallback message.')
  app.get('*', (req, res) => {
    // Diferente mensaje según el entorno
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
