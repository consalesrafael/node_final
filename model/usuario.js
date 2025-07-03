const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/database");

const usuario = connection.define('usuario', {
    nome: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("adm", "user"),
        allowNull: false,
        defaultValue: "user"
    } 
}, {
    tableName: "usuario",
    timestamps: false 
});

usuario.sync({ force: false }).then(() => {
    console.log("Tabela de usuário criada com sucesso!");
});

module.exports = usuario;
