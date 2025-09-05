import mongoose from 'mongoose'
import { Order } from '../Schemas/orderSchema.js'
import { Payment } from '../Schemas/paymentSchema.js'

// Create Payment (User)
export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body
    // ✅ Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' })
    }

    // ✅ Check if order exists
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // ✅ Check amount
    if (amount !== order.totalAmount) {
      return res
        .status(400)
        .json({ message: 'Payment amount does not match order total' })
    }
    // ✅ Create payment
    const payment = new Payment({
      orderId,
      userId: req.user._id,
      amount,
      paymentMethod,
      paymentStatus: 'pending'
    })
    const createdPayment = await payment.save()

    res.status(201).json({
      message: 'Payment initiated successfully',
      payment: createdPayment
    })
  } catch (error) {
    console.error('Payment creation error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// 🟡 Update Payment Status (Admin / Payment Gateway)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { paymentStatus, transactionId } = req.body

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid payment ID format' })
    }

    const payment = await Payment.findById(id)
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    // ✅ Only admin can update (or a simulated payment gateway callback)
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Access denied: Admin/Payment Gateway only' })
    }
    // ✅ Allowed status
    const allowedStatuses = ['pending', 'completed', 'failed']
    if (!allowedStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}`
      })
    }

    // ✅ Update fields
    payment.paymentStatus = paymentStatus
    if (transactionId) {
      payment.transactionId = transactionId
    }

    await payment.save()

    res.status(200).json({
      message: 'Payment status updated successfully',
      payment
    })
  } catch (error) {
    console.error('Payment update error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
