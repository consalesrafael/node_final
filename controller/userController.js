const bcrypt = require("bcrypt");
const usuario = require("../model/usuario");

async function createUser(req, res) {
    const usuarioN = req.body.usuarioN;
    const emailN = req.body.emailN;
    const senhaN = req.body.senhaN;

    console.log(usuarioN, emailN, senhaN);

    try {
        if (!usuarioN || !emailN || !senhaN) {
            return res
                .status(400)
                .json({ message: "Usuário, email ou senha estão em branco" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senhaN, salt);

        await usuario.create({
            nome: usuarioN,
            email: emailN,
            senha: hash
        });

        res.redirect("/")

    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ message: "Erro ao criar usuário", error: err.message });
    }
}


module.exports = {
    createUser
};
