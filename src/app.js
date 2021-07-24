/*! api/index.js | Main API file */

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
// import xss from 'xss-clean'
// import cors from 'cors'
import morgan from 'morgan'

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
// Sanitize user input coming from POST body, GET queries, and url params
// app.use(xss())

// Enable CORS - Cross Origin Resource Sharing
// app.use(cors({
//   origin: process.env.APP_CLIENT_URL
// }))

// Development logging middleware
// Log all requests to the console in dev env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes middlewares
app.use('/', routeIndex)

export default app
