import { beforeEach, describe, expect, it, test } from "vitest"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Gym Case', () => {

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to registration', async () => {

        const { gym } = await sut.handle({
            title: 'Axe fit',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0
        })

        expect(gym.id).toEqual(expect.any(String))

    })
    
    
})