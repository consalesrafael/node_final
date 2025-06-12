const express = require("express");
const path = require("path");
const app = express();
// const usuario = require("./database/usuario")
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const { where } = require("sequelize");
const router = require("./routes/routes")

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use("/",router)
app.set("view engine", "ejs")

app.listen("3000", (req,res)=>{
    console.log("Abriu na porta 3000")
})
