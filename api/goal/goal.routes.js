const express = require('express');
const goalController = require('./goal.controller');
const goalApiRouter = express.Router();

goalApiRouter
  .route('/')
  .get(goalController.findAll)
  .post(goalController.createOne);

goalApiRouter
  .route('/:id')
  .get(goalController.findOne)
  .patch(goalController.updateOne)
  .patch(goalController.updateCompletedDates);

module.exports = goalApiRouter;
