import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be greater than 0']
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'card', 'upi', 'wallet'],
      default: 'cod'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  { timestamps: true }
)

paymentSchema.index({ userId: 1, orderId: 1 })

export const Payment = mongoose.model('Payment', paymentSchema)
