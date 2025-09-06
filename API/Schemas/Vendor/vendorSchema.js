import mongoose from 'mongoose'

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    businessPhone: { type: String, required: true },
    address: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

const Vendor = mongoose.model('Vendor', vendorSchema)
export default Vendor
