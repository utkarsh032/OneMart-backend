import express from 'express'
import 'dotenv/config'
import { dbConnection } from './Databse/db.js'
import authRouter from './API/Routers/authRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)

// Database Connection
dbConnection()

// Server Connetion
app.listen(PORT, () => {
  console.log(`Server listenin one PORT : ${PORT}`)
})
