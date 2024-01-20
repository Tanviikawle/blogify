// create main Model
const db = require('../models')
const User = db.users;
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../config/passport')

const renderLogin = (req,res)=>{
    const cookies = req.cookies;
    res.render('users/login',{cookies});
}

const renderRegister = (req,res)=>{
    const cookies = req.cookies;
    res.render('users/register',{cookies});
}

const register =  async(req, res) => {
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    }
    const user = await User.create(newUser)
    const userId = user.dataValues.id
    const payload = {
            username: user.username,
            id: user.id
        }
        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })
        const newToken = 'Bearer ' + token;
        return res.cookie('savedToken',newToken,
        {httpOnly:true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,}).redirect(`/user/${userId}/blogs`);
}

const login = async(req, res) => {
    const user = await User.findOne({ where: {username: req.body.username} });
    //No user found.
    if (!user) {
        return res.redirect('/register');
    }
    //Incorrect password
    if (!compareSync(req.body.password, user.password)) {
        return res.redirect('/login');
    }
    
    const userId = user.dataValues.id
    const payload = {
            username: user.username,
            id: user.id
        }
        const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })
        const newToken = 'Bearer ' + token;
        return res.cookie('savedToken',newToken,
        {httpOnly:true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,}).redirect(`/user/${userId}/blogs`);
}

const logout = (req,res)=>{
    return res.clearCookie('savedToken')
    .redirect('/')
}





module.exports={
    renderLogin,
    renderRegister,
    register,
    login,
    logout
}