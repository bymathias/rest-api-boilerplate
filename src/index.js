/*! index.js */

import app from '@/app'

const { APP_API_PORT = 4001 } = process.env

// Binds and listens for connections
const server = app.listen(APP_API_PORT, () => console.log(`Listening on port ${APP_API_PORT}`))

export default server
