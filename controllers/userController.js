const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc register new user
//@route POST /api/user/register
//@acess public
const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(401);
        throw new Error("all fields are mandetory");
    };

    // is user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("User already registered");
    }

    // hashed paswd
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(user);
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }else{
        res.status(500);
    }

})


//@desc login user
//@route POST /api/user/login
//@acess public
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(401);
        throw new Error("all fields are mandetory");
    };

    const user = await User.findOne({email});
    // compare paswd
    if(user && (await bcrypt.compare(password,user.password))){
        //provide a access token
        const accesstoken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            {expiresIn: "15m"}
        )
        res.status(200).json({
            accessToken : accesstoken,
        })
    }else{
        res.status(401)
        throw new Error ("email or password not valid")
    }



})

//@desc get current log in user
//@route POST /api/user/current
//@acess private
const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser}