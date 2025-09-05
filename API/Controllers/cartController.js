// 🛒 Add product to cart
import Cart from '../Schemas/cartSchema.js'
import Product from '../Schemas/productSchema.js'

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: 'ProductId and Quantity required' })
    }
    // Product check
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // Stock check + concurrency handle
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(400).json({ message: 'Insufficient stock' })
    }

    // Cart check
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }
    // Item exists? update quantity
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.price
      })
    }

    await cart.save()
    res.status(200).json({ message: 'Product added to cart', cart })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// ❌ Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id
    const { productId } = req.body

    let cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const item = cart.items.find(i => i.productId.toString() === productId)
    if (!item) return res.status(404).json({ message: 'Item not in cart' })

    // Restore stock
    await Product.findByIdAndUpdate(productId, {
      $inc: { stock: item.quantity }
    })

    cart.items = cart.items.filter(i => i.productId.toString() !== productId)

    await cart.save()
    res.status(200).json({ message: 'Product removed from cart', cart })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// 📦 Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id
    const cart = await Cart.findOne({ userId }).populate('items.productId')
    if (!cart) return res.status(200).json({ message: 'Cart is empty' })

    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
