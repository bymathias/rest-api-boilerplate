import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'RESTful API ',
      version: process.env.npm_package_version
    })
})

export default router
