 const bcrypt = require("bcrypt")
 
 async function createUser(req,res){
    const usuarioN = req.body.usuarioN
    const emailN = req.body.emailN
    const senhaN = req.body.senhaN

    try{
        if(!usuarioN || !emailN || !senhaN){
            return res
                .status(400)
                .json({message: "Usuario, email ou senha esta em branco"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senhaN, salt);

        usuario.create({
            nome: usuarioN,
            email: emailN,
            senha: hash
        })
        res.status(201).json({message: err})
        

    }catch(err){
        res.status(500).json({message: "Erro ao criar usuario", error: err})
    }
 }

 module.exports ={
    createUser
 }