// POST /api/orders → Create order (user)
import mongoose from 'mongoose'
import { Order } from '../Schemas/orderSchema.js'

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus,
      orderStatus
    } = req.body

    // ✅ Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' })
    }

    // ✅ Validate totalAmount
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' })
    }

    // ✅ Create new order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: paymentStatus || 'pending',
      orderStatus: orderStatus || 'processing'
    })

    // ✅ Save order
    const createdOrder = await order.save()

    res.status(201).json({
      message: 'Order placed successfully',
      order: createdOrder
    })
  } catch (error) {
    console.error('Order creation error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get User's Order
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product', 'name price images')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' })
    }

    res.status(200).json({
      message: 'User orders fetched successfully',
      count: orders.length,
      orders
    })
  } catch (error) {
    console.error('Fetch user orders error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get Order Details BY ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' })
    }

    // ✅ Fetch order with user + product details
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price images')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // ✅ Access Control → User can see only own orders, Admin can see all
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Access denied: Not your order' })
    }

    res.status(200).json({
      message: 'Order fetched successfully',
      order
    })
  } catch (error) {
    console.error('Fetch order by ID error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Mark as paid
export const markOrderAsPaid = async (req, res) => {
  try {
    const { id } = req.params
    const { paymentDetails } = req.body
    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' })
    }
    // ✅ Fetch order
    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    // ✅ Access Control → User can update only own orders, Admin can update all
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Access denied: Not your order' })
    }
    // ✅ Update payment status
    order.paymentStatus = 'paid'
    order.paymentDetails = paymentDetails || {}
    const updatedOrder = await order.save()
    res.status(200).json({
      message: 'Order marked as paid',
      order: updatedOrder
    })
  } catch (error) {
    console.error('Mark order as paid error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update status (admin only)
export const updatedOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { orderStatus } = req.body

    // ✅ Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID format' })
    }

    // ✅ Find order
    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // ✅ Only admin can update order status
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' })
    }

    // ✅ Allowed status values (example: processing → shipped → delivered → cancelled)
    const allowedStatuses = ['processing', 'shipped', 'delivered', 'cancelled']
    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}`
      })
    }

    // ✅ Update order status
    order.orderStatus = orderStatus
    await order.save()

    res.status(200).json({
      message: 'Order status updated successfully',
      order
    })
  } catch (error) {
    console.error('Order status update error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
