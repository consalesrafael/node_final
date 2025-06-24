const Sequelize = require("sequelize")
require("dotenv").config()

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        port: process.env.DB_PORT
    });
    
    connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o DB");
    })
    .catch((msgErro) => {
        console.error("Erro ao conectar com o DB:", msgErro);
    });

module.exports = connection