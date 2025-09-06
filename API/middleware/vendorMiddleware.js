export const isVendor = (req, res, next) => {
  if (req.user && req.user.role === 'vendor') {
    next()
  } else {
    res.status(403).json({ message: 'Vendor access denied' })
  }
}
