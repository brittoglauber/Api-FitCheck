import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gym Use Case', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)

    })


    it('should be able to fetch nearby gyms', async () => {
        // -14.5032519,-42.2264545,
        await gymsRepository.create({
            title: 'Axé fit',
            description: null,
            phone: null,
            latitude: 14.1640837,
            longitude: -41.6481613
        })

        await gymsRepository.create({
            title: 'Power Gym',
            description: null,
            phone: null,
            latitude: -14.5032519,
            longitude: -42.2264545
        })

        const { gyms } = await sut.handle({
            userLatitude: 14.1640837,
            userLongitude: -41.6481613

        })
        
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({title: 'Axé fit'})])

    })

    
})