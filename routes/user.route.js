const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authorization = require("../middleware/authorization");
const { verifyToken } = require("../middleware/verifyToken");
router
    .post("/sign",verifyToken,authorization("admin" ), userController.signup)  
    .post("/login", userController.login)
    .get("/user",verifyToken,authorization("admin","manager" ), userController.getUser)
    .get("/user/me",verifyToken ,userController.getMe)
router
    .patch("/user/:id",verifyToken,authorization("admin","manager" ), userController.updateUser)
    .delete("/user/:id",verifyToken,authorization("admin" ), userController.deleteUser)
   
module.exports = router;