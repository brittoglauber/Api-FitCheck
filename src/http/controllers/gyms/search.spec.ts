import request from "supertest"
import { afterAll, beforeAll, describe, expect, it, test } from "vitest"
import { app } from "../../../app"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Create Gym (e2e)', () => {

    beforeAll( async () => {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })

    it('should be able to search gyms by title', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Axé fit',
            description: 'Academia popular',
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091 
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Barra fit',
            description: 'Academia elite',
            phone: '',
            latitude: -22.2092052,
            longitude: -44.6401091 
        })

        const response = await request(app.server)
            .get('/gym/search')
            .query({
                q: 'Barra'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        
        
    })
})