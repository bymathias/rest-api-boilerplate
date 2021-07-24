import supertest from 'supertest'
import api from '@/index'

const request = supertest(api)

afterAll(() => {
  api.close()
})

describe('Base Specs', () => {
  test('GET "/" should return status code 200', async () => {
    const response = await request.get('/')

    expect(response.status).toBe(200)
  })

  test('GET "/qwertyuiop" should return status code 404', async () => {
    const response = await request.get('/qwertyuiop')

    expect(response.status).toBe(404)
  })
})
