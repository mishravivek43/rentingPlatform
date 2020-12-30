let express = require('express');
let router = express.Router();

let user = require('./user')
router.use('/users', user)
let items = require('./items')
router.use('/items', items)

router.get('/testServer', (req,res,next)=>{
    // let reqBody = req.body;

   res.send("Api hit successfully");



});
module.exports = router