import morgan from 'morgan'
import { logger } from '#logger'

export const loggingMiddleware = (format: string, getObject: (message: string) => object) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  morgan(format, {
    stream: {
      write: message => {
        // const [method, url, status, responseTime] = message.split(' ')

        // Assuming the positions in the message are accurate
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const logObject = getObject(message)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call -- logger.info is a function
        logger.info(JSON.stringify(logObject))
      },
    },
  })
