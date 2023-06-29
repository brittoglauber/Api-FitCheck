import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxNumberOfCheckIInsError } from "./erros/max-number-of-check-ins--error"
import { MaxDistanceError } from "./erros/max-distance-error"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {

    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Axe fit',
            description: '',
            phone: '',
            latitude: 14.1640837,
            longitude: -41.6481613
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 14.1640837,
            userLongitude: -41.6481613
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 14.1640837,
            userLongitude: -41.6481613
        })


        await expect(() =>
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 14.1640837,
                userLongitude: -41.6481613
            }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckIInsError)

    })

    it('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 14.1640837,
            userLongitude: -41.6481613
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))


        const { checkIn } = await  sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 14.1640837,
            userLongitude: -41.6481613
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Starck',
            description: '',
            phone: '',
            latitude: new Decimal(14.2082699),
            longitude: new Decimal(-41.6724943)
        })

        await expect(() => 
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: 14.1640837,
                userLongitude: -41.6481613,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError)

        

    })

})