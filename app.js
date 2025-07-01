const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./routes/routes")
const cookieParser = require("cookie-parser")

const app = express();

app.use(bodyParser.json()); 
app.use(cookieParser())
app.use(express.static("public"));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",router)


app.listen("3000", (req,res)=>{
    console.log("Abriu na porta 3000")
})
