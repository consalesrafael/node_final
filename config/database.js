const ms = require("ms");
const Sequelize = require("sequelize")

const connection = new Sequelize("node_final","root","root",{
    host: "localhost",
    dialect: "mysql",
    port: "3307"
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