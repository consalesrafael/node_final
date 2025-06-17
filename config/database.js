require("dotenv").config()
const Sequelize = require("sequelize")

const connection = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host: "localhost",
    dialect: "mysql",
    port: DB_PORT
});
    connection
            .authenticate
            .then(()=>{
                console.log("conexão feito com o db")
            })
            .catch((msgErro)=>{
                console.log(msgErro)
            })

module.exports = connection