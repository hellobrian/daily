const mongoose = require('mongoose');
const Goal = require('../models/Goal');

exports.create = async (req, res) => {
  const goal = await new Goal(req.body).save();
  res.json({ goal });
};

exports.findAll = async (req, res) => {
  const goals = await Goal.find();
  res.json({ goals });
};
