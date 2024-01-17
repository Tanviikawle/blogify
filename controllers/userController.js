// create main Model
const db = require('../models')
const User = db.users;

const { hashSync, compareSync } = require('bcrypt');

// require('../config/passport')

const renderLogin = (req,res)=>{
    res.render('users/login');
}

const renderRegister = (req,res)=>{
    res.render('users/register');
}

const register =  async(req, res) => {
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    }
    const user = await User.create(newUser)
    res.redirect(`/blogs`);
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
    // const payload = {
    //     username: user.username,
    //     id: user._id
    // }
    // const token = jwt.sign(payload, "Random string", { expiresIn: "1d" })
    return res.redirect('/blogs');
}

module.exports={
    renderLogin,
    renderRegister,
    register,
    login
}