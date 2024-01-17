const { blogSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError.js');

const validateBlog = (req,res,next) => {
    const {error} = blogSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }else {
        next();
    }
}

const isLoggedIn = (req,res,next)=>{
    const token = req.cookies.savedToken;
    if(!token){
        res.redirect('/login');
    }
    next();
}

// const isAuthor = async(req,res,next)=>{
//     const { id } = req.params;
//     const blog = await Blog.findOne({ where: { id: id }})
//     if(!blog.author.equals(req.user._id)){
//         return res.redirect(`/cafes/${id}`);
//     }
//     next();
// }

module.exports = {
    validateBlog,
    isLoggedIn
}
