const { type } = require("os");
const Sequelize = require("../config/database")
const connection = require("./banco")

const usuario = connection.define('usuario', {
    nome: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        
    }
    
}, {
    timestamps: false 
});

 usuario.sync({force: false}).then(()=>{})

module.exports = usuario