import { beforeEach, describe, expect, it, test } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsErro } from "./erros/user-already-exists-error"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

})