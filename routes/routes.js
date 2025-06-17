const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController")
const userController = require("../controller/userController")
// router.get("/", loginController.renderIndex)
router.get("/screnCreate",(req,res)=>{
    res.render("pages/screnCreate")
})
router.post("/createUser", userController.createUser)
router.get("/",(req,res)=>{
    res.render('login')
})
module.exports=router
