import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "../../../app"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Nearby Gym (e2e)', () => {

    beforeAll( async () => {
        await app.ready()
    })

    afterAll( async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Axé fit',
            description: 'Academia popular',
            phone: '',
            latitude: 14.1640837,
            longitude: -41.6481613
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Barra fit',
            description: 'Academia elite',
            phone: '',
            latitude: -14.5032519,
            longitude: -42.2264545
        })

        const response = await request(app.server)
            .get('/gym/nearby')
            .query({
                latitude: 14.1640837,
                longitude: -41.6481613
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Axé fit'
            })
        ])
    })
})