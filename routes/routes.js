const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")
const userController = require("../controller/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const productController = require("../controller/productController");
const produto = require("../model/produto");
const path = require("path");
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename:function (req,res,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });
router.get("/screnCreate",(req,res)=>{
    res.render("pages/screnCreate")
})
router.get("/home", authMiddleware.verificaJWT, (req, res) => {
    produto.findAll({ raw: true }).then(produtos => {
        res.render("pages/home", {
            user: req.user,
            currentRoute: req.path,
            produtos: produtos 
        });
    }).catch(err => {
        console.error("Erro ao buscar produtos:", err);
        res.status(500).send("Erro ao carregar a página.");
    });
});

router.get("/gerenciarProdutos",authMiddleware.verificaJWT, productController.renderizaProduto)
router.post("/logout",loginController.logout)
router.post('/createProduct', upload.single('imagem'), productController.criaProduto);
// router.post('/produtos/editar/:id', upload.single('imagem'), productController.updateProduct);
router.post("/createUser", userController.createUser)
router.post("/produtos/deletar/:id", authMiddleware.verificaJWT, productController.deletaProduto)

router.post("/login", loginController.login)

router.get("/",(req,res)=>{
    res.render('login')
})
module.exports=router
