import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createPayment,
  updatePaymentStatus
} from '../Controllers/transactionController.js'

const transactionRouter = express.Router()

transactionRouter.post('/', protect, createPayment)
transactionRouter.put('/:id/status', protect, updatePaymentStatus)

export default transactionRouter
