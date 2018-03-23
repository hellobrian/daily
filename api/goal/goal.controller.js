const mongoose = require('mongoose');
const Goal = require('./goal.model');

exports.createOne = async (req, res) => {
  const goal = await new Goal(req.body).save();
  res.json(goal);
};

exports.findAll = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

exports.findOne = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id });
  res.json(goal);
};

exports.updateOne = async (req, res, next) => {
  if (req.body.completedDates) {
    console.log('date should be updated! calling next!');
    return next();
  }
  const goal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });
  res.json(goal);
};

exports.updateCompletedDates = async (req, res) => {
  const goal = await Goal.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { completedDates: req.body.completedDates } },
    { new: true }
  );
  res.json(goal);
};
