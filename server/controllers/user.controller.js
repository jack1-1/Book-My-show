const User=require('../models/user.model.js')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


async function registerUserController(req,res){
    try {
   const userExists= await User.findOne({email:req.body.email});
   if(userExists){
    res.send({
        success:false,
        message:"User alraedy exist with this email."
    })
   }
   //hash pwd before saving user
   const {password}=req.body;
   const salt=await bcrypt.genSalt(10);
   const hashPwd= bcrypt.hashSync(password,salt);
   req.body.password=hashPwd;
   const newUser=await User(req.body);
   await newUser.save();
   res.send({
    success:true,
    message:'User registered successfully',
    user:newUser
   })
 } catch (error) {
    console.log(error);
    
    res.status(500).json({message:error});
 }
}

//user sigin controller
async function signinUserController(req,res){
    try {
    const user= await User.findOne({email:req.body.email});
    if(!user){
        res.send({
            success:false,
            message:'User not found,please register !'
        })
    }
    //if user exist compare passwords
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        res.send({
            success:false,
            message:'Invalid password'
        })
       
    }
    //generate jwt token
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET, {expiresIn:'10d'});
    res.cookie('jwtToken',token,{
        httpOnly:true,
        // maxAge:
    });
        console.log("response login",res);
     res.send({
            success:true,
            message:'You logged in successfully',
            user:user
            // token:token
        })

    } catch (error) {
        res.status(500).json({message:'Error while logging in'})
    }
}

//
async function validateCurrentuser(req,res){
    console.log('user identified');
 const userId=req.userId;
 if(userId===undefined){
    return res.status(401).json({message:"Not authorized, no token found"});
 }
 try {
    const verfiedUser=await User.findById(userId).select("-password");
    res.json(verfiedUser);
 } catch (error) {
    return res.status(500).json({message:"Server error"});
 }
//  res.send({'userId':userId});
}

module.exports={registerUserController,signinUserController, validateCurrentuser}
