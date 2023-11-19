import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import { ZodError } from 'zod'

const port = env.PORT

const app = fastify()

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

app.listen({ port }).then(() => {
  console.log(`Server started on http://localhost:${port}`)
})
