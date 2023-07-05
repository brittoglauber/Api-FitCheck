import request from "supertest"
import { afterAll, beforeAll, describe, expect, it, test } from "vitest"
import { app } from "../../../app"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Profile (e2e)', () => {

    beforeAll( async () => {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })

    it('should be able to get a user profile', async () => {

        const token = await createAndAuthenticateUser(app)

        const profileResponse = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.statusCode).toEqual(expect.objectContaining({
            email: 'johndoe@example.com',
        }))
        
    })
})