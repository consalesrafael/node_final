const { produto, avaliacao, usuario } = require('../model');

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
    const usuarioId = req.user ? req.user.id : null;

    const produtosComAvaliacoes = await produto.findAll({
      include: [{
        model: avaliacao,
        as: 'avaliacoes'
      }],
      order: [['nome', 'ASC']]
    });

    const produtosFormatados = produtosComAvaliacoes.map(p => {
      const plainProduto = p.get({ plain: true });
      
      const totalAvaliacoes = plainProduto.avaliacoes.length;
      let mediaAvaliacoes = 0;
      let minhaAvaliacao = 0;

      if (totalAvaliacoes > 0) {
        const somaNotas = plainProduto.avaliacoes.reduce((acc, av) => acc + av.avaliacao, 0);
        mediaAvaliacoes = somaNotas / totalAvaliacoes;

        if (usuarioId) {
          const minhaAvObj = plainProduto.avaliacoes.find(av => av.userId === usuarioId);
          if (minhaAvObj) {
            minhaAvaliacao = minhaAvObj.avaliacao;
          }
        }
      }

      plainProduto.mediaAvaliacoes = mediaAvaliacoes;
      plainProduto.totalAvaliacoes = totalAvaliacoes;
      plainProduto.minhaAvaliacao = minhaAvaliacao;
      
      return plainProduto;
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

async function exibirRelatorios(req, res) {
  try {
    const [produtos, usuarios] = await Promise.all([
      produto.findAll({ order: [['nome', 'ASC']], raw: true }),
      usuario.findAll({ order: [['nome', 'ASC']], raw: true })
    ]);

    res.render('pages/relatorios', {
      produtos: produtos,
      usuarios: usuarios,
      user: req.user,
      currentRoute: req.path
    });

  } catch (error) {
    console.error("Erro ao gerar relatórios:", error);
    res.status(500).send("Erro ao carregar a página de relatórios.");
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
  exibirRelatorios,
  criaProduto,
  deletaProduto,
  editarProduto,
  avaliaProduto
};
