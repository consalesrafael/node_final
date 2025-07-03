const bcrypt = require("bcrypt");
const usuario = require("../model/usuario");
const { Op } = require("sequelize");



async function createUser(req, res) {
    const { usuarioN, emailN, senhaN } = req.body;

    if (!usuarioN || !emailN || !senhaN) {
        return res.render('pages/screnCreate', { 
            erro: "Todos os campos são obrigatórios." 
        });
    }

    try {
        const existente = await usuario.findOne({
            where: {
                [Op.or]: [
                    { nome: usuarioN },
                    { email: emailN }
                ]
            }
        });

        if (existente) {
            return res.render('pages/screnCreate', {
                erro: "O nome de utilizador ou o e-mail já estão em uso."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(senhaN, salt);

        await usuario.create({
            nome: usuarioN,
            email: emailN,
            senha: hash
        });

        res.redirect("/");

    } catch (err) {
        console.error("Erro ao criar utilizador:", err);
        res.render('pages/screnCreate', {
            erro: "Ocorreu um erro inesperado ao criar a sua conta."
        });
    }
}

module.exports = {
    createUser
};