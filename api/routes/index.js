const express = require('express');
const goalController = require('../controllers/goalController.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/goals');
});

router.post('/goals', goalController.create);
router.get('/goals', goalController.findAll);

module.exports = router;
