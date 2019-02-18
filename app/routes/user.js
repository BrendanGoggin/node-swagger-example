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

/* GET user by id */
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId).then(user => res.json(user));
});

/* PUT user by id */
router.put('/:userId', (req, res) => {
  User.findById(req.params.userId).then(user => user.update(
    { name: req.body.name },
  )).then(user => res.json(user));
});

/* DELETE user by id */
router.delete('/:userId', (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (user) {
      user.destroy();
    } else {
      res.sendStatus(404);
    }
  }).then(() => res.sendStatus(200));
});

module.exports = router;
