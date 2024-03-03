const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@acess private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.json(contacts);
});

//@desc Create contact
//@route POST /api/contacts
//@acess private
const createContacts = asyncHandler(async (req, res) => {
  console.log("the data is :", req.body);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(401);
    throw new Error("ALL FIELD ARE MANDETORY !");
  }
  // is email already exists
  const existingUser = await Contact.findOne({email});
  if(existingUser){
      res.status(400);
      throw new Error("Email already taken");
  }

  const contact = await Contact.create({name, email, phone,user_id:req.user.id});
  res.json(contact);
});

//@desc Get contact by id
//@route GET /api/contacts/:id
//@acess private
const getContactById = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  };
  // is the fetched contact belong to current user
  if(contact.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("User is not autherized")
  }
  res.json(contact);
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@acess private
const deleteContactById = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found");
  };
  // is the fetched contact belong to current user
  if(contact.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("User is not autherized")
  }

  await Contact.deleteOne({_id:req.params.id});
  res.json(contact);});

//@desc Update contact by id
//@route PUT /api/contacts/:id
//@acess private
const updateContactById = asyncHandler(async(req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(401);
    throw new Error("ALL FIELD ARE MANDETORY !");
  }

  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found");
  };
// is the fetched contact belong to current user
  if(contact.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("User is not autherized")
  }

  await Contact.updateOne({_id:req.params.id},
    {$set:{
      name:name,
      email:email,
      phone:phone
    }
    });

  const updatedContact = await Contact.findById(req.params.id);
  res.json(updatedContact);});

module.exports = {
  getContacts,
  createContacts,
  getContactById,
  deleteContactById,
  updateContactById,
};
