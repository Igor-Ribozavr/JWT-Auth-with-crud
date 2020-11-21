const Orders = require('../models/Orders');
const errorHandler = require('../utils/errorHandler');
const { createSchema, updateSchema } = require('../utils/authValidators');

module.exports.getAll = async function (req, res) {
  try {
    const orders = await Orders.find({
      user: req.user._id,
    });
    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getOneById = async function (req, res) {
  try {
    const order = await Orders.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  try {
    const result = await createSchema.validateAsync(req.body);
    const order = await Orders.create({
      title: result.title,
      amount: result.amount,
      user: req.user._id,
    });
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {
  try {
    const result = await updateSchema.validateAsync(req.body);
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title: result.title, amount: result.amount } },
      {
        new: true,
      }
    );
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.delete = async function (req, res) {
  try {
    const order = await Orders.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ status: 'succses' });
  } catch (error) {
    errorHandler(res, error);
  }
};
