import mongoose from 'mongoose'

const URL =
  process.env.MONGO_URL ||
  'mongodb+srv://utkarshraj525_db_user:xd0JHuWif9QXVBSY@cluster0.tzn2l8p.mongodb.net/onemart'
export const dbConnection = async () => {
  try {
    await mongoose.connect(URL)
    console.log('Database connected successfully!')
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}
