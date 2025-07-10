const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../config/database");
const { type, userInfo } = require("os");

const avaliacao = connection.define ("avaliacao",{
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
    timestamps: false,
    indexes:[
        {
        unique: true,
        fields: ['produtoId', 'userId']
    }]
});

module.exports = avaliacao
