const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/database");
const { type } = require("os");

const produtos = connection.define('produto', {
    nome: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagemUrl:{
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "produtos",
    timestamps: false 
});



module.exports = produtos;
