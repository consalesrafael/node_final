const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")
const userController = require("../controller/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const productController = require("../controller/productController");
const path = require("path");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename:function (req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

router.get("/screnCreate",(req,res)=>{
    res.render("pages/screnCreate")
})


router.get("/home", authMiddleware.verificaJWT, productController.exibirCatalogo);

router.get("/gerenciarProdutos",authMiddleware.verificaJWT, productController.renderizaProduto)
router.post("/logout",loginController.logout)
router.post('/createProduct', upload.single('imagem'),authMiddleware.verificaJWT, productController.criaProduto);
router.post('/produtos/editar/:id', upload.single('imagem'),authMiddleware.verificaJWT, productController.editarProduto);
router.post("/createUser", userController.createUser)
router.post("/produtos/deletar/:id", authMiddleware.verificaJWT, productController.deletaProduto)
router.post("/p/:id",authMiddleware.verificaJWT, productController.avaliaProduto)
router.post("/login", loginController.login)

router.get("/",(req,res)=>{
    res.render('login')
})

module.exports=router;