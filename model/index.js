const usuario = require("./usuario");
const produto = require("./produto");
const avaliacao = require("./avaliacao");


usuario.hasMany(avaliacao, {
    foreignKey: 'userId', 
    as: 'avaliacoes'
});


avaliacao.belongsTo(usuario, {
    foreignKey: 'userId', 
    as: 'usuario'       
});


produto.hasMany(avaliacao, {
    foreignKey: 'produtoId', 
    as: 'avaliacoes'
});


avaliacao.belongsTo(produto, { 
    foreignKey: 'produtoId', 
    as: 'produto'       
});


module.exports = {
    db: require('../config/database'), 
    usuario,
    produto,
    avaliacao
};