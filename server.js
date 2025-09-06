import express from 'express'
import 'dotenv/config'
import { createServer } from 'http'

import { dbConnection } from './Databse/db.js'
import authRouter from './API/Routers/authRoutes.js'
import productRouter from './API/Routers/productRoutes.js'
import orderRouter from './API/Routers/orderRoutes.js'
import cartRouter from './API/Routers/cartRouter.js'
import wishlistRouter from './API/Routers/wishlistRoutes.js'
import transactionRouter from './API/Routers/transactionRoutes.js'
import analyticsRouter from './API/Routers/AdminRoutes/analyticsRoutes.js'
import vendorRouter from './API/Routers/VendorRoutes/vendorRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// Create HTTP Server
const httpServer = createServer(app)

// Root Route
app.get('/', (req, res) => {
  res.json({ message: '✅ Server is Started Successfully!' })
})

// Routes
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/cart', cartRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/transaction', transactionRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/vendors', vendorRouter)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || 'Something went wrong!' })
})

// Database Connection
dbConnection()

// Server Connection
httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening on PORT: ${PORT}`)
})
