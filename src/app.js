/*! api/index.js | Main API file */

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

// Routes
import routeIndex from '@/routes'

const app = express()
app.disable('etag')

// Parse incoming request bodies
// application/json
app.use(bodyParser.json())
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Secure apps by setting various HTTP headers
app.use(helmet())
// Enable CORS - Cross Origin Resource Sharing
app.use(cors())
// Routes middlewares
app.use('/', routeIndex)

export default app
