const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const blogController = require('./controllers/blogController');
const validateBlog = require('./middleware');
const ExpressError = require('./utils/ExpressError');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))


app.get('/blogs', blogController.getAllBlogs)
app.get('/new',blogController.renderCreateNewBlog)
app.get('/blogs/:id',blogController.getOneBlog)
app.post('/blogs',validateBlog,blogController.createBlog)
app.get('/blogs/:id/update', blogController.renderUpdateBlog)
app.put('/blogs/:id',validateBlog,blogController.updateBlog)
app.delete('/blogs/:id',blogController.deleteBlog)

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})

//global error handeling middlewear.
app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, Something wenr wrong!'
    res.status(statusCode).render('error',{err});
    // res.send('Oh boy, Something went wrong!!');
})



app.listen(3000,()=>{
    console.log('Listening on port 3000!');
})