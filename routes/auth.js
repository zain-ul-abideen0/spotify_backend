const express=require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const {getToken} =require("../utils/helper")

//registering user
router.post("./register",async (req,res)=>{
    //creating a new user in db
    //for avoiding the storing the password in plain text we convert it into hashed passord

    const{email,password,firstName,lastName,username}=req.body
    const user=await User.findOne({email:email});
    if (user){
        return res
        .status(403)
        .json({error:"user aalready exists"})
    }
    const hashedpassword=bcrypt.hash(password,10);
    const newUserData={email,password,firstName,lastName,username};
    const newUser=await User.create(newUserData);
    const token= await getToken(email,newUser);
    //returning result to the user
    const userToReturn={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

})
module.exports=router;