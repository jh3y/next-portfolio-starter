module.exports = {
  images: {
    loader: process.env.NODE_ENV !== 'production' ? 'default' : 'cloudinary',
    domains: ['res.cloudinary.com', 'localhost'],
    ...(process.env.NODE_ENV === 'production' && {
      path: process.env.CLOUDINARY_PATH,
    }),
  },
}
