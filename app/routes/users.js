const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json([
    {
      username: 'user_one',
    },
    {
      username: 'user_two',
    },
  ]);
});

module.exports = router;
