import { randomUUID } from "crypto"

export class DatabaseMemory{
#bonecas = new Map()

list(search){
    return Array.from(this.#bonecas.entries()).map((bonecasArray) =>{
    // acessando primeira posição
        const id = bonecasArray[0]
        const data = bonecasArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(boneca => {
        if (search){
            return boneca.colecao.includes(search)
        }
        return true
    })
}
create(boneca){
    const bonecaId = randomUUID()
    this.#bonecas.set(bonecaId, boneca)
}
update(id, boneca){
    this.#bonecas.set(id, boneca)
}
delete(id, boneca){
    this.#bonecas.delete(id, boneca)
}
}