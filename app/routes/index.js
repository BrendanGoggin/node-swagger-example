const express = require('express');

const router = express.Router();

/* GET hello world. */
router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
