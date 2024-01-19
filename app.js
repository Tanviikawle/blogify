const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');
const { validateBlog,isLoggedIn }= require('./middleware');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const commentController = require('./controllers/commentController');

const db = require('./models')
const User = db.users;
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

require('./config/passport')


const app = express();

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(cookieParser());

app.use(passport.initialize());

app.get('/user/:userId/blogs', blogController.getAllBlogs)
app.get('/user/:userId/new',isLoggedIn, blogController.renderCreateNewBlog)
app.get('/user/:userId/blogs/:id',blogController.getOneBlog)
app.post('/user/:userId/blogs',isLoggedIn,validateBlog,blogController.createBlog)
app.get('/user/:userId/blogs/:id/update', blogController.renderUpdateBlog)
app.put('/user/:userId/blogs/:id',isLoggedIn,validateBlog,blogController.updateBlog)
app.delete('/user/:userId/blogs/:id',isLoggedIn,blogController.deleteBlog)

app.post('/user/:userId/blogs/:id/comment',isLoggedIn,commentController.addComment);
app.get('/user/:userId/blogs/:id/comment/:cId/update', commentController.renderUpdate)
app.put('/user/:userId/blogs/:id/comment/:cId',isLoggedIn,commentController.updateComment)

app.get('/',(req,res)=>{
    res.render('landingpage');
})

//user routes
app.get('/login',userController.renderLogin);
app.get('/register',userController.renderRegister);
app.post('/register',userController.register);
app.post('/login',userController.login)
app.get('/logout',isLoggedIn,userController.logout);

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