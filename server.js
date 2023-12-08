import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/boneca', (request, reply) => {
// Acessando dados do corpo da requisição
    const {coleção, marca, descrição} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        coleção: coleção,
        marca: marca,
        descrição: descrição,
    })

    return reply.status(201).send
})

server.get('/boneca', (request) => {
    const search = request.query.search
    console.log(search)
    const bonecas = database.list(search)
    //console.log(bonecas)
    return bonecas
})

server.put('/bonecas/:id', (request, reply) => {
    const bonecaId = request.params.id
    const {coleção, marca, descrição} = request.body
    const boneca = database.update(bonecaId, {
        coleção: coleção,
        marca: marca,
        descrição: descrição,
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