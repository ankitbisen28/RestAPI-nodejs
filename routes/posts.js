const router = require("express").Router();
const verify = require('./verifyToken');

router.get('/', verify , (req,res) => {
    res.json({Title: "this is my first Post", Description: "Hello i'm ankit i'm 19 year old boy"});
})


module.exports = router;
