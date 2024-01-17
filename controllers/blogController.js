const db = require('../models')

// create main Model
const Blog = db.blogs
// const Review = db.reviews

const renderCreateNewBlog = (req,res)=>{
    const cookies = req.cookies;
    res.render('blog/new',{cookies});
}

// 1. create blog
const createBlog = async (req, res) => {
    const newBlog = {
        title: req.body.blog.title,
        content: req.body.blog.content,
    }
    const blog = await Blog.create(newBlog)
    res.redirect(`/blogs/${blog.id}`)
}

// 2. get all blogs

const getAllBlogs = async (req, res) => {
    const cookies = req.cookies;
    const blogs = await Blog.findAll({})
    console.log(req.cookies)
    // console.log(blogs)
    res.render('blog/index',{blogs,cookies})
}

// 3. get single blog

const getOneBlog = async (req, res) => {
    const cookies = req.cookies;
    const { id } = req.params
    const blog = await Blog.findOne({ where: { id: id }})
    res.render('blog/show',{blog,cookies})
}

const renderUpdateBlog = async(req,res)=>{
    const cookies = req.cookies;
    const { id } = req.params
    const blog = await Blog.findOne({ where: { id: id }})
    res.render('blog/update',{blog,cookies});
}

// 4. update blog

const updateBlog = async (req, res) => {
    const { id } = req.params;
    console.log(req.body.blog.title);
    const updateBlog = await Blog.update({title: req.body.blog.title,content:req.body.blog.content},
        {where: {id: id}})
    res.redirect(`/blogs/${id}`);
}

// 5. delete blog by id

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const result = await Blog.destroy({ where: { id: id }} );
    console.log(result);
    res.redirect(`/blogs`);
}

// 7. connect one to many relation Product and Reviews
// const getBlogComments =  async (req, res) => {
//     const { id }= req.params
//     const data = await Blog.findOne({
//         include: [{
//             model: Comment,
//             as: 'comment'
//         }],
//         where: { id: id }
//     })
//     res.status(200).send(data)
// }

module.exports = {
    renderCreateNewBlog,
    createBlog,
    getAllBlogs,
    getOneBlog,
    renderUpdateBlog,
    updateBlog,
    deleteBlog
}
