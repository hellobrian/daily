const mongoose = require('mongoose');
const isToday = require('date-fns/is_today');
const isSameDay = require('date-fns/is_same_day');
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
  // Find completedDates on existing document
  const findHabit = await Habit.findOne({ _id: req.params.id });
  const alreadyCompletedToday = findHabit.completedDates
    .filter((date) => {
      console.log(date);
      return isSameDay(req.body.completedDates, date);
    })
    .some((date) => {
      console.log(date);
      return isToday(date);
    });

  // // If there are existing completed dates, then
  const updatedBody = alreadyCompletedToday
    ? {
        $set: {
          title: req.body.title
        }
      }
    : {
        $set: { title: req.body.title },
        $push: { completedDates: req.body.completedDates }
      };

  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id },
    updatedBody,
    { new: true }
  );

  res.json(habit);
};
