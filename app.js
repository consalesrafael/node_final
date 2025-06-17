const express = require("express");
const path = require("path");
const app = express();
// const usuario = require("./database/usuario")
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const { where } = require("sequelize");
const router = require("./routes/routes")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use("/",router)


app.listen("3000", (req,res)=>{
    console.log("Abriu na porta 3000")
})
