const express = require('express');
const router = express.Router();

router.get('/instruction', (req, res) => {
  res.render('instruction');
});

module.exports = router;
