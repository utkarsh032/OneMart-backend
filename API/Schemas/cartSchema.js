import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        priceAtAdd: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)

const Cart = mongoose.model('Cart', cartSchema)
export default Cart