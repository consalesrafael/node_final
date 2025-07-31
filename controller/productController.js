const { produto, avaliacao } = require('../model');

async function renderizaProduto(req, res) {
  try {
    const produtos = await produto.findAll({ raw: true });
    res.render('pages/gerenciaProdutos', {
      user: req.user,
      currentRoute: req.path,
      produtos: produtos
    });
  } catch (err) {
    console.error("Erro ao buscar produtos para gerenciar:", err);
    res.status(500).send("Erro ao carregar a página de gerenciamento.");
  }
};

async function exibirCatalogo(req, res) {
  try {
    if (!req.user || !req.user.id) {
      const produtos = await produto.findAll({ raw: true });
      return res.render('pages/home', {
        produtos: produtos.map(p => ({ ...p, minhaAvaliacao: 0 })),
        user: req.user,
        currentRoute: req.path
      });
    }

    const usuarioId = req.user.id;
    const produtos = await produto.findAll({
      include: [{
        model: avaliacao,
        as: 'avaliacoes',
        where: { userId: usuarioId },
        required: false
      }],
      order: [['nome', 'ASC']]
    });

    const produtosFormatados = produtos.map(item => {
      const p = item.get({ plain: true });
      p.minhaAvaliacao = p.avaliacoes && p.avaliacoes.length > 0 ? p.avaliacoes[0].avaliacao : 0;
      return p;
    });

    res.render('pages/home', {
      produtos: produtosFormatados,
      user: req.user,
      currentRoute: req.path
    });

  } catch (error) {
    console.error("Erro ao buscar produtos para o catálogo:", error);
    res.status(500).send("Erro ao carregar o catálogo.");
  }
}

async function criaProduto(req, res) {
  const nome = req.body.nomep;
  const descricao = req.body.descricaop;
  const categoria = req.body.categoriap;
  const imagem = req.file ? '/uploads/' + req.file.filename : '/image.png';

  try {
    await produto.create({
      nome: nome,
      descricao: descricao,
      categoria: categoria,
      imagemUrl: imagem
    });
    res.redirect("/gerenciarProdutos");
  } catch (err) {
    console.log(err);
  }
}

async function deletaProduto(req, res) {
  const produtoId = req.params.id;
  if (produtoId) {
    try {
      await produto.destroy({ where: { id: produtoId } });
      res.redirect("/gerenciarProdutos");
    } catch (err) {
      console.log(err);
    }
  }
}

async function editarProduto(req, res) {
  const id = req.params.id;
  const { nomep: nome, descricaop: descricao, categoriap: categoria } = req.body;
  
  let dadosParaAtt = { nome, descricao, categoria };

  if (req.file) {
    dadosParaAtt.imagemUrl = '/uploads/' + req.file.filename;
  }
  
  try {
    await produto.update(dadosParaAtt, { where: { id: id } });
    res.redirect("/gerenciarProdutos");
  } catch (err) {
    console.log(err);
  }
}

async function avaliaProduto(req, res) {
  try {
    const produtoId = req.params.id;
    const usuarioId = req.user.id;
    const nota = req.body.rating;

    if (!produtoId || !usuarioId || !nota) {
      return res.status(400).send("Dados incompletos para a avaliação.");
    }

    const avaliacaoExiste = await avaliacao.findOne({
      where: {
        userId: usuarioId,
        produtoId: produtoId
      }
    });

    if (avaliacaoExiste) {
      await avaliacaoExiste.update({ avaliacao: nota });
    } else {
      await avaliacao.create({
        avaliacao: nota,
        produtoId: produtoId,
        userId: usuarioId
      });
    }
    
    res.redirect("/home");

  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
    res.status(500).send("Ocorreu um erro ao processar sua avaliação.");
  }
}

module.exports = {
  renderizaProduto,
  exibirCatalogo,
  criaProduto,
  deletaProduto,
  editarProduto,
  avaliaProduto
};