let User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createUserValidation, loginValidation } = require('../middlewares/validateUser')
const jwt = require('jsonwebtoken');



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
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    

    try {
        const saveUser = await user.save();
        
        //create and assign a token using jwt
    const token = jwt.sign({_id: user._id}, process.env.USER_SECRET_TOKEN)
    // res.header('login-token', token).send(token)
    //   let header = ('login-token', token)

        res.json({
            status: 200,
            success: true,
            header: 'login-token',
            saveUser,
            token
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
    res.send("You are logged in")
}




 module.exports = { createUser, loginUser, }




