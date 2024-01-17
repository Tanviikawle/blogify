const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const passport = require('passport');
// create main Model
const db = require('../models')
const User = db.users;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

// const blog = await Blog.findOne({ where: { id: id }})

passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
    await User.findOne({ where: { id: id }}, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));