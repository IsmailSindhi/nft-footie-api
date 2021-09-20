const router = require('express').Router();

router.get("/", (req, res) =>{
    res.send("THis is user router")
})

module.exports= router