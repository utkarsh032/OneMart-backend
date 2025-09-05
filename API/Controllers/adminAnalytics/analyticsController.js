import { Order } from '../../Schemas/orderSchema.js'

// 🟢 Sales Summary (total revenue, total orders, pending/completed)
export const getSalesSummary = async (req, res) => {
  try {
    const summary = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0] }
          },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'processing'] }, 1, 0] }
          }
        }
      }
    ])

    res.status(200).json(summary[0] || {})
  } catch (error) {
    console.error('Analytics Error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// 🟡 Monthly Revenue
export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    res.status(200).json(revenue)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// 🟠 Top Selling Products
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          totalSold: { $sum: '$orderItems.qty' },
          revenue: {
            $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' }
    ])

    res.status(200).json(topProducts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// 🔵 Top Customers (by spend)
export const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          totalSpend: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { totalSpend: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }
    ])

    res.status(200).json(topCustomers)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
