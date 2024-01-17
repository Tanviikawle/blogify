const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const blogController = require('./controllers/blogController');
const validateBlog = require('./middleware');

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))


app.get('/blogs', blogController.getAllBlogs)
app.get('/blogs/:id',blogController.getOneBlog)
app.get('/new',blogController.renderCreateNewBlog)
app.post('/blogs',validateBlog,blogController.createBlog)
app.get('/blogs/:id/update', blogController.renderUpdateBlog)
app.put('/blogs/:id',validateBlog,blogController.updateBlog)
app.delete('/blogs/:id',blogController.deleteBlog)



app.listen(3000,()=>{
    console.log('Listening on port 3000!');
})