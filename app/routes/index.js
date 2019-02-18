const express = require('express');

const router = express.Router();

/* GET hello world. */
router.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

module.exports = router;
