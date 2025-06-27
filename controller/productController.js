async function renderizaProduto(req,res){
    res.render("pages/gerenciaProdutos",{
        user: req.user,
        currentRoute: req.originalUrl
    })
}

module.exports={
    renderizaProduto
}