const express=require('express');
const router=express.Router() //Route
const {registerUserController,signinUserController,validateCurrentuser}=require('../controllers/user.controller.js')
const isAuth=require('../middlewares/authMiddleware.js');
// Signup route
router.post('/register',registerUserController);
router.post('/login',signinUserController);
router.get("/current-user", isAuth,validateCurrentuser)

module.exports=router
