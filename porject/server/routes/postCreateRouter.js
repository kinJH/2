const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.sendFile("C:/Users/kmc01/Desktop/porject/html/index.html")
})

module.exports = router;