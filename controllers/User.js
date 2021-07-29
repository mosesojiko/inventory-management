let User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createUserValidation, loginValidation } = require('../middlewares/validateUser')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')



const createUser = async (req, res) =>{
    //validate the user data before creating a user
    //Let's validate the data before we make a user
    const {error} = createUserValidation(req.body)
    if(error) return res.send({"error":error.details[0].message});

    //checking if the user is already in the database using email.
    //to avoid populating the database with same user
    const existingEmail = await User.findOne({email: req.body.email})
    if(existingEmail){
        return res.status(400).send("Email already exist")
    }

    //hash the user password
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    //create a user based on user schema
    let user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    

    try {
        const saveUser = await user.save();
        
        res.json({
            status: 200,
            success: true,
            saveUser,
        })
        console.log(saveUser)
        
    } catch (error) {
        res.json({
            message: 'failed',
            error
        })
        console.log(error)
        
    }

}

//function to login a user
const loginUser = async (req, res) =>{

    //validate the user info before login
    const {error} = loginValidation(req.body)
    if(error) return res.send({"error":error.details[0].message});

    //check if the email correspond with email in database
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send("Email is not valid")
    }

    //check if the password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send("Invalid Password");
    }

     //create and assign a token using jwt
     const token = jwt.sign({_id: user._id}, process.env.USER_SECRET_TOKEN)

    return res.json({
        msg: "You are logged In",
        token
    })
}

//get all users
const getUsers = async (req, res) =>{
    try{
        let users = await User.find({});
        res.json(users)
    }catch(err){
        res.status(400).json({
            error: err
        })
    }
}

//get a specified user
const getSingleUser = async (req, res)=>{
    try{
        let findSingleUser = await User.findOne({id: req.params._id});
        return res.send(findSingleUser);

    }catch(err){
        res.status(400).json(err)

    }
}

//Update a user
const updateUserInfo = async (req, res) =>{
    await User.findOne({id: req.params._id})
    .then(doc => User.updateOne({_id: doc._id}, {name: req.body.name, email: req.body.email, password: req.body.password}))
    .then(()=>User.findOne({email: req.body.email}))
    .then(doc => {
        res.json({
            id: doc._id,
            name: doc.name,
            email:doc.email,
            password: doc.password
        })
        console.log(doc.name)
    });
}

//delete a user
const deleteUser = async (req, res) =>{
  try{
    await User.findOneAndDelete({_id: req.params.id})
    res.send("successful")
  }catch(err){
 res.send(err)
  }
  
 
}


 module.exports = { 
     createUser,
     loginUser,
     getUsers,
     getSingleUser,
     updateUserInfo,
     deleteUser
     }




