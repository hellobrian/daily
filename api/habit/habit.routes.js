const express = require('express');
const habitController = require('./habit.controller');
const habitApiRouter = express.Router();

habitApiRouter
  .route('/')
  .get(habitController.findAll)
  .post(habitController.createOne);

habitApiRouter
  .route('/:id')
  .get(habitController.findOne)
  .patch(habitController.updateOne);

module.exports = habitApiRouter;
