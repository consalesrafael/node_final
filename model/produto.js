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
    // nota:{
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // }
}, {
    tableName: "produtos",
    timestamps: false 
});

produtos.sync({ force: false }).then(() => {
    console.log("Tabela de usuário criada com sucesso!");
});

module.exports = produtos;
