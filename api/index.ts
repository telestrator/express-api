import express from 'express'
import http from 'node:http'
import logger from 'morgan'

const app = express()
const PORT = process.env.PORT ?? 3000

// Logger middleware
app.use(logger('short'))

app.use(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!')
})

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}`)
})
