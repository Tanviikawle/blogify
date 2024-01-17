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