import express from 'express'
import http from 'node:http'

const app = express()
const PORT = process.env.PORT ?? 3000

// Passive middleware
app.use(function (request, response, next) {
  console.log(`Request received: [${request.method}] ${request.url}`)
  next()
})

// Active middleware
app.use(function (req, res, next) {
  const minutes = new Date().getMinutes()
  if (minutes % 2 === 0) {
    next()
  } else {
    res.statusCode = 403
    res.end('Not authorized')
  }
})

app.use(function (req, res) {
  res.end(`Secret info: the password is ${process.env.PASSWORD}`)
})

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}`)
})
