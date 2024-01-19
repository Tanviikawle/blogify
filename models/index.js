const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
    }
)

sequelize.authenticate()
.then(() => {
    console.log('Database connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.blogs = require('./blogModel.js')(sequelize, DataTypes)
db.comments = require('./commentModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.users.hasMany(db.blogs, {
    foreignKey: 'user_id',
    as: 'blog'
})
db.blogs.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})

db.blogs.hasMany(db.comments, {
    foreignKey: 'blog_id',
    as: 'blog'
})
db.comments.belongsTo(db.blogs, {
    foreignKey: 'blog_id',
    as: 'user'
})

module.exports = db