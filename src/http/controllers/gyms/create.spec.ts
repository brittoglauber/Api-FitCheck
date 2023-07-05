import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "../../../app"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Create CheckIn (e2e)', () => {

    beforeAll( async () => {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })

    it('should be able to create gym', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const response = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Axé fit',
            description: 'Academia popular',
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091 
        })

        expect(response.statusCode).toEqual(201)
        
    })
})