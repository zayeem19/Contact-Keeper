const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

//@route GET api/contacts
//@desc  Gets user's contacts
//@acess Private
router.get('/', auth, async (req,res) => {
    try {
        const contact = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Bad Request');
    }
    
})

//@route POST api/contacts
//@desc  Adds contact
//acess  Private
router.post('/', [ auth, [
    check('name','Name is required').not().isEmpty()
]
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { name, email, phone, type } = req.body

    try {

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Bad Request');
    }

})

//@route PUT api/contacts/:id
//@desc  Updates contacts
//@acess Private
router.put('/:id',auth, async (req,res) => {
   const { name, email, phone, type } = req.body;

//Build contact object based of fields
const contactFields = {}
if(name) contactFields.name = name;
if(email) contactFields.email = email;
if(phone) contactFields.phone = phone;
if(type) contactFields.type = type;

try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json('Contact Not Found');

//User owns the contact
if (contact.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Unauthorized"});
}

contact = await Contact.findByIdAndUpdate(req.params.id,
    { $set : contactFields},
    { new : true});

    res.json(contact);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Bad Request!');
}

});
//@route DELETE api/contacts/:id
//@desc  Deletes contacts
//@acess Private
router.delete('/:id', auth, async (req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json('Contact not found');
   //User owns the contact
if (contact.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "Unauthorized"});
}

contact = await Contact.findByIdAndRemove(req.params.id)

    res.json({ msg: 'contact deleted' });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Bad Request!');
}

});

module.exports = router;