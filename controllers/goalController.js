const mongoose = require('mongoose');
const Goal = require('../models/Goal');

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

exports.updateOne = async (req, res) => {
  const updatedGoal = req.body.datesCompleted
    ? { $push: { datesCompleted: req.body.datesCompleted } }
    : req.body;

  const goal = await Goal.findOneAndUpdate(
    { _id: req.params.id },
    updatedGoal,
    {
      new: true
    }
  );
  res.json(goal);
};
