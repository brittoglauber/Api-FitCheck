import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { SearchGymUseCase } from "./search-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(gymsRepository)

    })


    it('should be able to search gyms', async () => {

        await gymsRepository.create({
            title: 'Axé fit',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        })

        const { gyms } = await sut.handle({
            query: 'Axé',
            page: 1
        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'Axé fit'})])

    })


    it ('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i ++) {
            await gymsRepository.create({
                title: `Axé fit ${i}` ,
                description: null,
                phone: null,
                latitude: 0,
                longitude: 0
            })
        }

        const { gyms } = await sut.handle({
            query: 'Axé',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Axé fit 21'}),
            expect.objectContaining({ title: 'Axé fit 22'}),
        ])
    })
    
})