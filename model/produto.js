const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/database");

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
    }
}, {
    tableName: "produtos",
    timestamps: false 
});

usuario.sync({ force: false }).then(() => {
    console.log("Tabela de usuário criada com sucesso!");
});

module.exports = usuario;
