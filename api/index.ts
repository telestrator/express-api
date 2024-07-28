import express from 'express'
import http from 'node:http'
import { loggingMiddleware } from '#middleware/logging'

const app = express()
const PORT = process.env.PORT ?? 3000

// setup Logging middleware
const morganFormat = ':method :url :status :response-time ms'
const createLogObject = (message: string) => {
  const [method, url, status, responseTime] = message.split(' ')

  return {
    method,
    url,
    status,
    responseTime,
  }
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- we know it's safe
app.use(loggingMiddleware(morganFormat, createLogObject))

app.use(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end("What's popping?")
})

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}`)
})
