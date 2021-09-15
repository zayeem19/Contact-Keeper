const express = require('express');
const router = express.Router();

//@route GET api/auth
//@desc  Gets logged user
//@acess Private
router.get('/', (req,res) => {
    res.send('user logged in');
});

//@route Post api/auth
//@desc  Auth user and get token
//@acess Public
router.post('/',(req,res) => {
    res.send('user authenticated');
});

module.exports = router;