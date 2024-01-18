const db = require('../models')
const Blog = db.blogs

const renderCreateNewBlog = (req,res)=>{
    const { userId } = req.params; 
    const cookies = req.cookies;
    res.render('blog/new',{cookies,userId});
}

// 1. create blog
const createBlog = async (req, res) => {
    const { userId } = req.params;
        const newBlog = {
        user_id: userId,
        title: req.body.blog.title,
        content: req.body.blog.content,
    }
    const blog = await Blog.create(newBlog)
    res.redirect(`/user/${userId}/blogs/${blog.dataValues.id}`)
}

// 2. get all blogs

const getAllBlogs = async (req, res) => {
    const {userId} = req.params
    const cookies = req.cookies;
    const blogs = await Blog.findAll({})
    res.render('blog/index',{blogs,cookies,userId})
}

// 3. get single blog

const getOneBlog = async (req, res) => {
    const { userId , id } = req.params;
    const cookies = req.cookies;
    const blog = await Blog.findOne({ where: { id: id }})
    res.render('blog/show',{blog,cookies,userId})
}

const renderUpdateBlog = async(req,res)=>{
    const { userId , id } = req.params;
    const cookies = req.cookies;
    const blog = await Blog.findOne({ where: { id: id }})
    res.render('blog/update',{blog,cookies,userId});
}

// 4. update blog

const updateBlog = async (req, res) => {
    const { userId } = req.params;
    const { id } = req.params;
    const updateBlog = await Blog.update({title: req.body.blog.title,content:req.body.blog.content},
        {where: {id: id}})
    res.redirect(`/user/${userId}/blogs/${id}`);
}

// 5. delete blog by id

const deleteBlog = async (req, res) => {
    const { userId } = req.params;
    const { id } = req.params;
    const result = await Blog.destroy({ where: { id: id }} );
    res.redirect(`/user/${userId}/blogs`);
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