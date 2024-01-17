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

module.exports = validateBlog


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return  res.redirect('/login');
    }
    next();
}