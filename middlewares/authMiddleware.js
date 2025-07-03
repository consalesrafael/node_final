const jwt = require("jsonwebtoken")

async function verificaJWT (req, res, next){
    const token = req.cookies.token;
    const currentUser = req.cookies.name
    if(!token){
        return  res.status(401).render('login', {erro: "Deslogado por falta de autenticidade"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next();
    }catch (err){
        return  res.status(500).render('login', {erro: "Erro interno no servidor"})
    }
}


module.exports={
    verificaJWT
}