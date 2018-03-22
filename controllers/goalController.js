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

exports.updateOne = async (req, res) => {
  if (req.body.datesCompleted) {
    const goalWithDate = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        $push: { datesCompleted: Date.now() }
      },
      { new: true }
    );
    res.json(goalWithDate);
  } else {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(goal);
  }
};

exports.findOne = async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id });
  res.json(goal);
};
