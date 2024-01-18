module.exports = (sequelize, DataTypes) => {

    const Blog = sequelize.define("blog", {
        user_id:{
            type:DataTypes.INTEGER,
            references: {
                model:'users', // <<< Note, its table's name, not object name
                key: 'id'  
            }          
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    return Blog;

}