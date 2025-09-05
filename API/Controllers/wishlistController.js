import Product from '../Schemas/productSchema.js'
import Wishlist from '../Schemas/wishlistSchema.js'

// ➕ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' })
    }

    // check product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: req.user._id })

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user._id, products: [] })
    }

    // check if product already in wishlist
    const alreadyExists = wishlist.products.some(
      p => p.productId.toString() === productId
    )
    if (alreadyExists) {
      return res.status(400).json({ message: 'Product already in wishlist' })
    }

    // add product
    wishlist.products.push({ productId })
    await wishlist.save()

    res.status(200).json({ message: 'Product added to wishlist', wishlist })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// ❌ Remove From Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body

    const wishlist = await Wishlist.findOne({ userId: req.user._id })
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' })
    }

    wishlist.products = wishlist.products.filter(
      p => p.productId.toString() !== productId
    )

    await wishlist.save()

    res.status(200).json({ message: 'Product removed from wishlist', wishlist })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// 📜 Get User Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
      'products.productId',
      'name price images'
    )

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' })
    }

    res.status(200).json(wishlist)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
