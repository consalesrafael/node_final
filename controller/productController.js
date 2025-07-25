
const { where } = require('sequelize');
const Produto = require('../model/produto'); 
const avaliacao = require('../model/avaliacao')


async function renderizaProduto (req, res)  {
    
    Produto.findAll({ raw: true })
        .then(produtos => {
        
            res.render('pages/gerenciaProdutos', {
                user: req.user,
                currentRoute: req.path,
                produtos: produtos
            });
        })
        .catch(err => {
            console.error("Erro ao buscar produtos para gerenciar:", err);
            res.status(500).send("Erro ao carregar a página de gerenciamento.");
        });
};

async function criaProduto(req,res) {
     const nome = req.body.nomep
     const descricao = req.body.descricaop
     const categoria = req.body.categoriap
     const imagem = req.file ? '/uploads/' + req.file.filename : '/image.png'

     console.log(nome,descricao,categoria) 

     Produto.create({
        nome: nome,
        descricao:descricao,
        categoria: categoria,
        imagemUrl: imagem
     }).then(()=>{
        res.redirect("/gerenciarProdutos")
     }).catch(err=>{
        console.log(err)
     })
}
async function deletaProduto(req,res) {
        const produtoId = req.params.id

        if(produtoId){
            Produto.destroy({
                where:{
                    id:produtoId
                }
            }).then(()=>{
                res.redirect("/gerenciarProdutos")
            })
        }
}
async function editarProduto(req,res) {
    const id = req.params.id
    const nome = req.body.nomep
     const descricao = req.body.descricaop
     const categoria = req.body.categoriap
     const imagem = req.file ? '/uploads/' + req.file.filename : '/image.png'

    let dadosParaAtt ={
        nome:nome,
        descricao:descricao,
        categoria:categoria,
    }

    if(req.file){
        dadosParaAtt.imagemUrl = '/uploads/' + req.file.filename
    }
     
    Produto.update(dadosParaAtt,{
        where:{
            id:id
        }
    })
    .then(()=>{
        res.redirect("/gerenciarProdutos")
     }).catch(err=>{
        console.log(err)
     })
}
async function avaliaProduto(req,res) {
    try{
        const produtoId = req.params.id
        const usuarioId = req.user.id
        const {nota, comentario} =req.body

        const avaliacaoExiste = await avaliacao.findOne({
            where:{
                usuarioId: usuarioId,
                produtoId: produtoId
            }
        })
        if (avaliacaoExiste){
            await avaliacaoExiste.update({nota, comentario})
            console.log(`Avaliação ATUALIZADA para o produto ${produtoId}`)
        }else{
            await avaliacao.create({
                nota,
                comentario,
                produtoId,
                usuarioId
            })
            console.log(`Nova avaliação CRIADA para o produto ${produtoId}`)
        }
        res.redirect(`/produtos/${produtoId}`)
    }catch (error){
        console.error("Erro ao salvar avaliação:", error);
        res.status(500).send("Ocorreu um erro ao processar sua avaliação.");
    }
}


module.exports={
    renderizaProduto,
    criaProduto,
    deletaProduto,
    editarProduto,
    avaliaProduto
}