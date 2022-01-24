/*! config/db.js | Database configuration */

module.exports = async function (mongoose) {
  // Connect to database
  await mongoose
    .connect(`mongodb://${process.env.APP_DB_USERNAME}:${process.env.APP_DB_PASSWORD}@localhost:${process.env.APP_DB_PORT}/${process.env.APP_DB_NAME}?authSource=${process.env.APP_DB_AUTH_SOURCE}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err))
}
