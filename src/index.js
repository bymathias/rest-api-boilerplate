/*! index.js */

import app from '@/app'

const { APP_PORT = 4001 } = process.env

// Binds and listens for connections
const server = app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))

export default server
