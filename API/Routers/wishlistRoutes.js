import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} from '../Controllers/wishlistController.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/add', protect, addToWishlist)
wishlistRouter.post('/remove', protect, removeFromWishlist)
wishlistRouter.get('/', protect, getWishlist)

export default wishlistRouter
