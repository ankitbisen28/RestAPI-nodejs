const router = require("express").Router();
const User = require("../model/User");

// VALIDATION
// const Joi = require("joi");

// const schema = Joi.object({
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email,
//   password: Joi.string().min(6).required(),
// });

router.post("/register", async (req, res) => {

    // Lets validate the data before  we a user
    // old one // const validation = Joi.valid(req.body, schema);
    // const validation = schema.validate(req.body);
    // res.send(validation);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
