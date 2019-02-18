const express = require('express');
const { User } = require('../sequelize');

const router = express.Router();

/* GET users */
router.get('/', (req, res) => {
  User.findAll().then(users => res.json(users));
});

/* POST new user */
router.post('/', (req, res) => {
  User.create(req.body).then(user => res.json(user));
});

module.exports = router;
