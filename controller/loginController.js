const usuarios = require("../model/usuario");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req,res){
        const email = req.body.email
        const senha = req.body.senha
        const usuarioExistente = await usuarios.findOne({ where: { email: email } });
        
        if(usuarioExistente){
            const senhaValida = await bcrypt.compare(senha, usuarioExistente.senha)
            if(senhaValida){
            const token = jwt.sign(
                {id: usuarioExistente.id, email: usuarioExistente.email, role: usuarioExistente.role },
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            )
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 36000000
            })
            
               return res.redirect("/home")
            }
        }
           
        return res.render("login", { erro: "E-mail ou senha incorretos." });
}

async function logout(req,res) {
    const token = req.cookies.token
    
    if(!token){
        return res.status(404).json({message: "Nenhum Usuario encontrado"})
    }
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })
    res.redirect("/")
}

module.exports= {
    login,
    logout
}