/*! app.js | Main API file */

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
// import xss from 'xss-clean'
// import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'

// Init MongoDB
import initDB from '@/config/db'

// Routes
import routeIndex from '@/routes'
import routeServices from '@/routes/v1/services'

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

// Setup database
initDB(mongoose)

// Routes middlewares
app.use('/', routeIndex)
app.use('/v1/services', routeServices)

export default app
