// routes/vendorRoutes.js
import express from 'express'
import {
  getAllVendors,
  getMyVendorProfile,
  registerVendor,
  updateVendorStatus
} from '../../Controllers/vendorFeatures/vendorController.js'
import { isAdmin } from '../../middleware/adminMiddleware.js'
import { protect } from '../../middleware/authMiddleware.js'

const vendorRouter = express.Router()

vendorRouter.post('/register', protect, registerVendor)
vendorRouter.get('/me', protect, getMyVendorProfile)

// Admin routes
vendorRouter.get('/', protect, isAdmin, getAllVendors)
vendorRouter.patch('/:id/status', protect, isAdmin, updateVendorStatus)

export default vendorRouter
