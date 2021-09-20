const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
// Register
router.post("/register", async (req, res) => {
    try {
        // generate password
        const salt = await bcrypt.genSalt(1);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        // create new user
        
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        
        await user.save();
        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)     
    }

});

// LOGIN

router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });

router.get("/", (req, res) =>{
    res.send("THis is auth router")
})

module.exports= router