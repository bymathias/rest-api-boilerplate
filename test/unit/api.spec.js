import supertest from 'supertest'
import api from '@/index'

const request = supertest(api)

describe('API Specs', () => {
  afterAll( async done => {
    await api.close(() => {
      setTimeout(done, 1000)
    })
  })

  it('GET "/" should return status code 200', async done => {
    // Sends GET Request to "/" endpoint
    const response = await request.get('/')

    expect(response.status).toBe(200)
    done()
  })

  it('GET "/qwertyuiop" should return status code 404', async done => {
    const response = await request.get('/qwertyuiop')

    expect(response.status).toBe(404)
    done()
  })
})
