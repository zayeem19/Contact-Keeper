const express = require('express');
const router = express.Router();

//@route GET api/contacts
//@desc  Gets user's contacts
//@acess Private
router.get('/',(req,res) => {
    res.send('gets user contacts');
})

//@route POST api/contacts
//@desc  Adds contact
//acess  Private
router.post('/',(req,res) => {
    res.send('adds user contacts');
})

//@route PUT api/contacts/:id
//@desc  Updates contacts
//@acess Private
router.put('/:id',(req,res) => {
    res.send('updates contact');
})

//@route DELETE api/contacts/:id
//@desc  Deletes contacts
//@acess Private
router.delete('/:id',(req,res) => {
    res.send('deletes contact');
})

module.exports = router;