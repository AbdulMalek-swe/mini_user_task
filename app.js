const express = require("express")
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(cors())
const user = require("./routes/user.route")
app.use("/api/v1/",user);
module.exports =  app; 