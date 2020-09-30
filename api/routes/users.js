var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ test: ['test1', 'test2', 'test3'] });
});

module.exports = router;
