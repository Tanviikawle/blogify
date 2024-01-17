module.exports = (sequelize, DataTypes) => {

    const Blog = sequelize.define("blog", {
        // id:{
        //     type:DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
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