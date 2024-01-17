// import controllers review, products
const blogController = require('../controllers/blogController.js')
const commentController = require('../controllers/commentController.js')
const userController = require('../controllers/userController.js')

// router
const router = require('express').Router()

//blog routes
router.post('/addBlog',blogController.createBlog)
router.get('/blogs', blogController.getAllBlogs)
router.get('/blogs/:id',blogController.getOneBlog)
router.put('/blogs/:id/edit', blogController.updateBlog)
router.delete('/blogs/:id/delete', blogController.deleteBlog)

//user routes
// router.get('/login', userController.)

module.exports = router