const createError = require('http-errors');
const express = require('express');
const { Todo } = require('../sequelize');

const router = express.Router();

/* GET todos */
router.get('/', (req, res) => {
  Todo.findAll().then(todos => res.json(todos));
});

/* POST new todo */
router.post('/', (req, res) => {
  Todo.create(req.body).then(todo => res.json(todo));
});

/* GET todo by id */
router.get('/:todoId', (req, res) => {
  Todo.findById(req.params.todoId).then((todo) => {
    if (todo) {
      res.json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

/* PUT todo by id */
router.put('/:todoId', (req, res) => {
  Todo.findById(req.params.todoId).then((todo) => {
    // 404 if not found
    if (!todo) throw createError(404);

    return todo.update(
      { description: req.body.description },
    );
  }).then(
    todo => res.json(todo),
  ).catch((error) => {
    /* TODO: make this error handling into middleware that handles all HttpErrors like this */
    if (error instanceof createError.HttpError) {
      res.sendStatus(error.statusCode);
    } else {
      res.sendStatus(500);
      throw error;
    }
  });
});

/* DELETE todo by id */
router.delete('/:todoId', (req, res) => {
  Todo.findById(req.params.todoId).then((todo) => {
    // 404 if not found
    if (!todo) throw createError(404);

    todo.destroy();
  }).then(() => res.sendStatus(200)).catch((error) => {
    /* TODO: make this error handling into middleware that handles all HttpErrors like this */
    if (error instanceof createError.HttpError) {
      res.sendStatus(error.statusCode);
    } else {
      res.sendStatus(500);
      throw error;
    }
  });
});

module.exports = router;
