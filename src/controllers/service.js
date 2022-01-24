import { Service } from '../models/Service'

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find()

    res
      .status(200)
      .json({
        status: 'success',
        results: services.length,
        data: {
          services
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// @desc    Get single service
// @route   GET /api/v1/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)

    res
      .status(200)
      .json({
        status: 'success',
        data: {
          service
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// @desc    Create new service
// @route   POST /api/v1/services
// @access  Private
exports.createService = async (req, res, next) => {
  try {
    const newService = await Service.create(req.body)

    res
      .status(200)
      .json({
        status: 'success',
        data: {
          service: newService
        }
      })
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// @desc    Update service
// @route   PUT /api/v1/services/:id
// @access  Private
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: {
          service
        }
      })
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// @desc    Delete service
// @route   DELETE /api/v1/services/:id
// @access  Private
exports.deleteService = async (req, res, next) => {
  try {
    await Service.findByIdAndDelete(req.params.id)

    res
      .status(204)
      .json({
        status: 'success',
        data: null
      })
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      })
  }
}
