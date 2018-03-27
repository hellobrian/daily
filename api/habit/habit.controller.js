const mongoose = require('mongoose');
const Habit = require('./habit.model');

exports.createOne = async (req, res) => {
  const habit = await new Habit(req.body).save();
  res.json(habit);
};

exports.findAll = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

exports.findOne = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id });
  res.json(habit);
};

exports.updateOne = async (req, res, next) => {
  if (req.body.completedDates) {
    console.log('date should be updated! calling next!');
    return next();
  }
  const habit = await Habit.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });
  res.json(habit);
};

exports.updateCompletedDates = async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { completedDates: req.body.completedDates } },
    { new: true }
  );
  res.json(habit);
};
