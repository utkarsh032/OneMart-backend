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

orderRouter.post('/orders', protect, createOrder)
orderRouter.get('/orders/my', protect, getUserOrders)
orderRouter.get('/orders/:id', protect, getOrderById)
orderRouter.put('/orders/:id/pay', protect, markOrderAsPaid)
orderRouter.put('/orders/:id/status', protect, updatedOrderStatus)

export default orderRouter
