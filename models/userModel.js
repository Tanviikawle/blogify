module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        // id:{
        //     type:DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User;

}