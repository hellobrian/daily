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
  const { completedDates, title } = req.body;

  /**
   * Find the Habit document based on req.params.id
   * Then, filter the completedDates array by dates that are the same day as req.body.completedDates
   * And check if some or one of the dates is today
   *
   * returns Boolean
   */
  const isCompletedToday = await Habit.findOne({ _id: req.params.id }).then(
    (habits) =>
      habits.completedDates
        .filter((date) => isSameDay(completedDates, date))
        .some((date) => isToday(date))
  );

  /**
   * If Habit has already been completed today,
   * Then update document with req.body.title only,
   * Else, update document with req.body.title AND push new Date to completedDates field from req.body.completedDates
   */
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id },
    isCompletedToday ? { title } : { title, $push: { completedDates } },
    { new: true }
  );

  res.json(habit);
};
