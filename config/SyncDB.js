const { error } = require("console")
const {Sequelize} = require("../model")

async function syncDatabase() {
    console.log("Iniciando a sincronização")
    try{
        await Sequelize.sync({ force: true})
        console.log("Banco de dados sincronizado com sucesso")
    }catch(erro){
        console.log("Erro ao sincronizar", error)
    }finally{
        await Sequelize.close()
    }
}

syncDatabase()