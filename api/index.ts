import express from 'express'
import http from 'node:http'
import morgan from 'morgan'
import { logger } from '#logger'

const morganFormat = ':method :url :status :response-time ms'

const app = express()
const PORT = process.env.PORT ?? 3000

// Logger middleware
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- morgan is a function
  morgan(morganFormat, {
    stream: {
      write: message => {
        const logObject = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          method: message.split(' ')[0],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          url: message.split(' ')[1],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          status: message.split(' ')[2],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          responseTime: message.split(' ')[3],
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call -- logger.info is a function
        logger.info(JSON.stringify(logObject))
      },
    },
  })
)

app.use(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!')
})

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}`)
})
