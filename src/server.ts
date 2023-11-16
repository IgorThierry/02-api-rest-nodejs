import fastify from 'fastify'
import { knex } from './database'

const port = process.env.PORT ? Number(process.env.PORT) : 3333

const app = fastify()

app.get('/', async () => {
  const transactions = await knex('transactions').select('*')

  return { transactions }
})

app.listen({ port }).then(() => {
  console.log(`Server started on http://localhost:${port}`)
})
