const express = require('express');
const createError = require('http-errors');
const Sequelize = require('sequelize');

const { logger } = require('../util/logger');
const { getOffsetAndLimit } = require('../util/requestParser');
const { Todo, User } = require('../sequelize');

const router = express.Router();

/* GET todos */
router.get('/', (req, res, next) => {
  try {
    const { offset, limit } = getOffsetAndLimit(req);
    Todo.findAll({ include: [User], limit, offset }).then(todos => res.json(todos)).catch(next);
  }
  catch(err) {
    return next(err);
  }
});

/* POST new todo */
router.post('/', (req, res, next) => {
  const todo = Todo.build(req.body);
  
  // if there are no users for the todo, save the todo and respond now
  if (!req.body.users || !Array.isArray(req.body.users) || req.body.users.length === 0) {
    return todo.save().then(todo => res.json(todo)).catch(next);
  }

  // sanity check on users array
  if (req.body.users.length > 50) throw createError(400);

  // if there are users specified for the task, fetch them and set them as the todo's users
  User.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: req.body.users.map(user => {
          // throw 404 if a user doesn't have an id listed
          if (!user.id) throw createError(400);
          return user.id;
        }),
      }
    },
  }).then(users => {
    logger.info('users: ' + JSON.stringify(users));
    if (users.length < req.body.users.length) {
      logger.warn('Failed to find all listed users in POST todo');
      throw createError(400);
    };
    // must save todo before adding users to it
    return Promise.all([users, todo.save()]);
  }).then(results => {
    const users = results[0];
    return Promise.all([users, todo.setUsers(users)]);
  }).then(results => {
    // add the users array to the todo object to make the response more sensible
    const users = results[0];
    const todoPretty = Object.assign({},
      // .toJSON returns a plain object instead of a SequelizeInstance 
      todo.toJSON(), 
      { users: users.map(user => user.toJSON()) },
    );
    res.json(todoPretty);
  }).catch(next);
});

/* GET todo by id */
router.get('/:todoId', (req, res, next) => {
  Todo.findById(req.params.todoId).then((todo) => {
    // 404 if not found
    if (!todo) throw createError(404);

    res.json(todo);
  }).catch(next);
});

/* PUT todo by id */
router.put('/:todoId', (req, res, next) => {
  Todo.findById(req.params.todoId).then((todo) => {
    // 404 if not found
    if (!todo) throw createError(404);

    return todo.update(
      { description: req.body.description },
    );
  }).then(
    todo => res.json(todo),
  ).catch(next);
});

/* DELETE todo by id */
router.delete('/:todoId', (req, res, next) => {
  Todo.findById(req.params.todoId).then((todo) => {
    // 404 if not found
    if (!todo) throw createError(404);

    todo.destroy();
  }).then(() => res.sendStatus(200)).catch(next);
});

module.exports = router;
