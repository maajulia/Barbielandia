import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/boneca', (request, reply) => {
// Acessando dados do corpo da requisição
    const {coleçao, marca, descricao} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        colecao: colecao,
        marca: marca,
        descricao: descricao,
    })

    return reply.status(201).send
})

server.get('/boneca', (request) => {
    const search = request.query.search
    console.log(search)
    const bonecas = database.list(search)
    console.log(bonecas)
    return bonecas
})

server.put('/bonecas/:id', (request, reply) => {
    const bonecaId = request.params.id
    const {colecao, marca, descricao} = request.body
    const boneca = database.update(bonecaId, {
        colecao: colecao,
        marca: marca,
        descricao: descricao,
    })
    return reply.status(204).send()
})

server.delete('/bonecas/:id', (request, reply) => {
    const bonecaId = request.params.id

    database.delete(bonecaId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})