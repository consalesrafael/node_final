const usuario = require("../model/usuario");
const bcrypt = require("bcrypt")


async function validaUsuario(req,res){
        const email = req.body.email
        const senha = req.body.senha
        const usuarioExistente = await usuario.findOne({ where: { email: email } });
        

        if(usuarioExistente){
            const senhaValida = await bcrypt.compare(senha, usuarioExistente.senha)
            if(senhaValida){
                res.redirect("/home")
            }
        }
           
        return res.render("login", { erro: "E-mail ou senha incorretos." });
}

module.exports= {
    validaUsuario
}