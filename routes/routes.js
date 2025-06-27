const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")
const userController = require("../controller/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const productController = require("../controller/productController")
// router.get("/", loginController.renderIndex)
router.get("/screnCreate",(req,res)=>{
    res.render("pages/screnCreate")
})
router.get("/home", authMiddleware.verificaJWT, (req,res)=>{
    res.render("pages/home",{
        user: req.user
    })
})
router.get("/gerenciarProdutos",authMiddleware.verificaJWT, productController.renderizaProduto)
router.post("/logout",loginController.logout)

router.post("/createUser", userController.createUser)
router.post("/login", loginController.login)
router.get("/",(req,res)=>{
    res.render('login')
})
module.exports=router
