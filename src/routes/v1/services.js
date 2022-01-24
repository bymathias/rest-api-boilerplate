import { Router } from 'express'

import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} from '@/controllers/service'

const router = Router()

router
  .route('/')
  .get(getServices)
  .post(createService)

router
  .route('/:id')
  .get(getService)
  .put(updateService)
  .delete(deleteService)

export default router
