const db = require('../models')
const Comment = db.comments

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

module.exports = {
    addComment
}