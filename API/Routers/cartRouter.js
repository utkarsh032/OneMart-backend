import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  addToCart,
  getCart,
  removeFromCart
} from '../Controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/add', protect, addToCart)
cartRouter.post('/remove', protect, removeFromCart)
cartRouter.get('/', protect, getCart)

export default cartRouter
