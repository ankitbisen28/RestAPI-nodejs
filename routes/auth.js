const router = require("express").Router();
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation} = require('../validation')

router.post("/register", async (req, res) => {
  
  // Lets validate the data before  we a user
  const { error }= registerValidation(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  // checking if user already exist 
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send("email already exists");

  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(req.body.password, salt);


  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hasPassword,
  });
  try {
    const savedUser = await user.save()
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {

   // Lets validate the data before  we a user
   const { error }= loginValidation(req.body);
   if(error){
     return res.status(400).send(error.details[0].message);
   }

  // checking if user exist 
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Email Not found");

  //checking password 
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send("Invalid Pass");

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
  req.header('auth-token', token);
  
  res.send(token);

});

module.exports = router;