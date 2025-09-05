import express from 'express'
import { protect } from '../../middleware/authMiddleware.js'
import {
  getMonthlyRevenue,
  getSalesSummary,
  getTopCustomers,
  getTopProducts
} from '../../Controllers/adminAnalytics/analyticsController.js'

const analyticsRouter = express.Router()

// Admin-only analytics
analyticsRouter.get('/summary', protect, getSalesSummary)
analyticsRouter.get('/sales/monthly', protect, getMonthlyRevenue)
analyticsRouter.get('/top-products', protect, getTopProducts)
analyticsRouter.get('/top-customers', protect, getTopCustomers)

export default analyticsRouter
