import Vendor from '../../Schemas/Vendor/vendorSchema.js'
import User from '../../Schemas/userSchema.js'

// Register as Vendor
export const registerVendor = async (req, res) => {
  try {
    const { businessName, businessEmail, businessPhone, address } = req.body

    const vendor = new Vendor({
      userId: req.user._id,
      businessName,
      businessEmail,
      businessPhone,
      address
    })

    await vendor.save()

    // Update user role
    await User.findByIdAndUpdate(req.user._id, { role: 'vendor' })

    res.status(201).json({ message: 'Vendor registered successfully', vendor })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Vendor Profile
export const getMyVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user._id }).populate(
      'products'
    )
    res.status(200).json(vendor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Admin → Approve/Reject Vendor
export const updateVendorStatus = async (req, res) => {
  try {
    const { status } = req.body
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.status(200).json({ message: 'Vendor status updated', vendor })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Admin → Get All Vendors
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('userId', 'name email role')
    res.status(200).json(vendors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
