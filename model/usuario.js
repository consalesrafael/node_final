const { type } = require("os");
const Sequelize = require("../config/database")
const connection = require("../config/database");
const { DataTypes } = require("sequelize");

const usuario = connection.define('usuario', {
    nome: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
     role:{
       type: DataTypes.ENUM("adm, user"),
        allowNull:false,
        default: "user"
     } 
}, {
    timestamps: false
});

 usuario.sync({force: false}).then(()=>{})

module.exports = usuario