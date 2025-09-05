import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById
} from '../Controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/add', protect, createProduct)

productRouter.get('/', getAllProducts)

productRouter.get('/:id', getProductById)

productRouter.patch('/:id', protect, updateProductById)

productRouter.delete('/:id', protect, deleteProductById)

export default productRouter
