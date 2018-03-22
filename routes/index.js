const express = require('express');
const goalController = require('../controllers/goalController.js');
const streakController = require('../controllers/streakController.js');
const router = express.Router();

router.post('/goals', goalController.createOne);
router.get('/goals', goalController.findAll);
router.get('/goals/:id', goalController.findOne);
router.patch('/goals/:id', goalController.updateOne);

router.post('/streaks', streakController.createOne);
router.get('/streaks', streakController.findAll);

module.exports = router;
