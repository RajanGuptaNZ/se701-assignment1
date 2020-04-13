
const express = require('express');

const router = express.Router();
const User = require('../db/models/users');

// Initialise table with pre-defined users until the add endpoint is implemented
const testUsers = [
  { email: 'user1@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [], },
  { email: 'user2@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [], },
  { email: 'user3@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [], },
  { email: 'user4@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [], },
  { email: 'user5@gmail.com', posts: [], comments: [], claps: [], laughs: [], sads: [], }
]

User.countDocuments(function (err, count) {
    if (!err && count === 0) {
      User.insertMany(testUsers, function(err, res) {
        if(err) throw (err);
      })
    }
});

// Create a new user
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Please include an email' });
    return;
  }

  try {

    const user = new User({
      email: email,
    });

    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
