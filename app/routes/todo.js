const createError = require('http-errors');
const express = require('express');
const { Todo } = require('../sequelize');

const router = express.Router();

/* GET todos */
router.get('/', (req, res, next) => {
  Todo.findAll().then(todos => res.json(todos)).catch(next);
});

/* POST new todo */
router.post('/', (req, res) => {
  Todo.create(req.body).then(todo => res.json(todo)).catch(next);
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
