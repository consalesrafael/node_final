const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/database");
const { type } = require("os");

const avalicao = connection.define ("avaliacao",{
        avaliacao:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        comentario:{
            type: DataTypes.TEXT,
            allowNull:true
        },
         produtoId: {
            type: DataTypes.INTEGER,
            allowNull:false
         },
         userId:{
            type:DataTypes.INTEGER,
            allowNull:false
         }
}, {
    tableName: "avaliacao",
    timestamps: false 
});

avalicao.sync({ force: false }).then(() => {
    console.log("Tabela de avaliacao criada com sucesso!");
})