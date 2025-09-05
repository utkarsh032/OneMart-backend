import express from 'express'

import { protect } from '../middleware/authMiddleware.js'
import {
  createOrder,
  getOrderById,
  getUserOrders,
  markOrderAsPaid,
  updatedOrderStatus
} from '../Controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/', protect, createOrder)
orderRouter.get('/my', protect, getUserOrders)
orderRouter.get('/:id', protect, getOrderById)
orderRouter.put('/:id/pay', protect, markOrderAsPaid)
orderRouter.put('/:id/status', protect, updatedOrderStatus)

export default orderRouter
