const db = require("../config/database")
const usuario = require("./usuario")
const produto = require("./produto")
const avalicao = require("./avaliacao")


usuario.hasMany(avalicao,{
    foreignkey: 'userId',
    as: 'avaliacao'
})
avalicao.belongsTo(usuario,{
    foreignkey: 'userId',
    as: usuario
})
produto.hasMany(avalicao,{
    foreignkey: 'produtoId',
    as: 'avaliacao'
})
produto.belongsTo(produto,{
    foreignkey: 'produtoId',
    as: 'produto'
})

async function SincronizarBanco() {
    try {
        await connection.sync({ force: false });
        console.log("Todos os modelos foram sincronizados com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar os modelos:", error);
    }
}

SincronizarBanco()