module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comment", {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    return Comment;

}