const { produto, usuario } = require('../model');



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

module.exports = {
  
  exibirRelatorios
};