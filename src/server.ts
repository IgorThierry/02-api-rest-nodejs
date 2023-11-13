import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  return { hello: 'world Node.js' }
})

app.listen({ port: 3333 }).then(() => {
  console.log('server is running')
})
