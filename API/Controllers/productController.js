import mongoose from 'mongoose'
import Product from '../Schemas/productSchema.js'

//  Create new product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, images } =
      req.body

    // Required field validation
    if (!name || !price || !stock || !category || !brand) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' })
    }

    // Role check (only admin can create product)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' })
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      brand,
      images: images || [],
      createdBy: req.user._id
    })

    const savedProduct = await newProduct.save()

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Get all products with search, filter, pagination, sort
export const getAllProducts = async (req, res) => {
  try {
    let { page, limit, keyword, category, sortBy, order } = req.query

    // ✅ Defaults
    page = Number(page) || 1
    limit = Number(limit) || 10
    order = order === 'desc' ? -1 : 1

    // ✅ Query object
    const query = {}

    // Search by keyword (name/brand/category)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } }
      ]
    }

    // Filter by category
    if (category) {
      query.category = category
    }

    // ✅ Sorting
    const sortOptions = {}
    if (sortBy) {
      sortOptions[sortBy] = order // e.g. price: 1 or -1
    } else {
      sortOptions.createdAt = -1 // default: newest first
    }

    // ✅ Pagination
    const total = await Product.countDocuments(query)
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' })
    }

    const product = await Product.findById(id).populate(
      'reviews.user',
      'name email'
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Update product (Admin only)
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' })
    }

    // ✅ Find product
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // ✅ Role check (only admin can update product)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' })
    }

    // ✅ Allowed fields only (security measure)
    const allowedUpdates = [
      'name',
      'description',
      'price',
      'stock',
      'category',
      'brand',
      'images'
    ]
    const updates = {}
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })

    // ✅ Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Delete product (Admin only)
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' })
    }

    // ✅ Find product
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // ✅ Role check (only admin can delete product)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' })
    }

    // ✅ Delete product
    await Product.findByIdAndDelete(id)

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
