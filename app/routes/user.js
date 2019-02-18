const createError = require('http-errors');
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
  User.findById(req.params.userId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  });
});

/* PUT user by id */
router.put('/:userId', (req, res) => {
  User.findById(req.params.userId).then((user) => {
    // 404 if not found
    if (!user) throw createError(404);

    return user.update(
      { name: req.body.name },
    );
  }).then(
    user => res.json(user),
  ).catch((error) => {
    /* TODO: make this error handling into middleware that handles  all HttpErrors like this */
    if (error instanceof createError.HttpError) {
      res.sendStatus(error.statusCode);
    } else {
      res.sendStatus(500);
      throw error;
    }
  });
});

/* DELETE user by id */
router.delete('/:userId', (req, res) => {
  User.findById(req.params.userId).then((user) => {
    // 404 if not found
    if (!user) throw createError(404);

    user.destroy();
  }).then(() => res.sendStatus(200)).catch((error) => {
    /* TODO: make this error handling into middleware that handles  all HttpErrors like this */
    if (error instanceof createError.HttpError) {
      res.sendStatus(error.statusCode);
    } else {
      res.sendStatus(500);
      throw error;
    }
  });
});

module.exports = router;
