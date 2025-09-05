import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      address: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered'],
      default: 'processing'
    },
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
)
export const Order = mongoose.model('Order', orderSchema)
