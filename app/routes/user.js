const createError = require('http-errors');
const express = require('express');

const { logger } = require('../util/logger');
const { User } = require('../sequelize');

const router = express.Router();

/* GET users */
router.get('/', (req, res, next) => {
  User.findAll().then(users => res.json(users)).catch(next);
});

/* POST new user */
router.post('/', (req, res, next) => {
  User.create(req.body).then(user => res.json(user)).catch(next);
});

/* GET user by id */
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      logger.info(`user ${req.params.userId} not found!`);
      res.sendStatus(404);
    }
  }).catch(next);
});

/* PUT user by id */
router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    // 404 if not found
    if (!user) throw createError(404);

    return user.update(
      { name: req.body.name },
    );
  }).then(
    user => res.json(user),
  ).catch(next);
});

/* DELETE user by id */
router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    // 404 if not found
    if (!user) throw createError(404);

    user.destroy();
  }).then(() => res.sendStatus(200)).catch(next);
});

module.exports = router;
