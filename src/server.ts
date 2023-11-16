import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const port = env.PORT

const app = fastify()

app.get('/', async () => {
  const transactions = await knex('transactions').select('*')

  return { transactions }
})

app.listen({ port }).then(() => {
  console.log(`Server started on http://localhost:${port}`)
})
