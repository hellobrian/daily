const mongoose = require('mongoose');
const Streak = require('../models/Streak');
const Goal = require('../models/Goal');

exports.createOne = async (req, res) => {
  const streak = await new Streak(req.body).save();
  res.json({ streak });
};

exports.findAll = async (req, res) => {
  const streaks = await Streak.find();
  res.json({ streaks });
};
