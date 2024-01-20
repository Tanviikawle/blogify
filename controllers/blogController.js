const db = require('../models')
const Blog = db.blogs
const Comment = db.comments
const User = db.users

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
    const blogs = await Blog.findAll({
        include: [
        {
            model: User,
            attributes: ['username']   
        }]
    })
    res.render('blog/index',{blogs,cookies,userId})
}

// 3. get single blog

const getOneBlog = async (req, res) => {
    const { userId , id } = req.params;
    const cookies = req.cookies;
    const blog = await Blog.findOne({ 
        include: [{
            model: Comment,
            attributes: ['id','body','user_id','blog_id']
        },
        {
            model: User,
            attributes: ['username']   
        }],
        where: { id: id }})
        console.log(JSON.stringify(blog))
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

module.exports = {
    renderCreateNewBlog,
    createBlog,
    getAllBlogs,
    getOneBlog,
    renderUpdateBlog,
    updateBlog,
    deleteBlog
}