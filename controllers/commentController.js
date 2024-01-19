const db = require('../models')
const Comment = db.comments
const Blog = db.blogs

const addComment = async(req,res)=>{
    const { userId,id } = req.params;
    const newComment = {
        user_id:userId,
        blog_id:id,
        body:req.body.comment
    }
    const result = await Comment.create(newComment);
    console.log(result)
    res.redirect(`/user/${userId}/blogs/${id}`);
}

const renderUpdate = async(req,res)=>{
    const {userId, id ,cId} = req.params;
    const cookies = req.cookies;
    const blog = await Blog.findOne({ where: { id: id }})
    const comment = await Comment.findOne({ where: { id: cId }})
    res.render('blog/updateComment',{blog,cookies,userId,comment});
}

const updateComment = async(req,res)=>{
    const {userId,id,cId}  = req.params;
    const updateComment = await Comment.update({body: req.body.comment},
        {where: {id:cId}})
    res.redirect(`/user/${userId}/blogs/${id}`)
}

module.exports = {
    addComment,
    renderUpdate,
    updateComment
}