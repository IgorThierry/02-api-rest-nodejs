import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'
import { ZodError } from 'zod'

export const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, { prefix: '/transactions' })

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    const validationMessages = error.errors.map(
      (validationError) => validationError.message,
    )
    reply
      .code(400)
      .send({ message: 'Validation Error', details: validationMessages })
  } else {
    reply.status(500).send({ message: 'Internal server error' })
  }
})
