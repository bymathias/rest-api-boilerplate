const { Schema, model } = require('mongoose')

const serviceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A service must have a title'],
    unique: true,
    minlength: 5,
    maxlength: 55,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A service must have a description'],
    minlength: 5,
    maxlength: 255
  },
  priority: {
    type: Number,
    default: 2
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Service = model('Service', serviceSchema)

module.exports = { Service }
