const Orders = require('../models/Orders');
const errorHandler = require('../utils/errorHandler');
const { createSchema, updateSchema } = require('../utils/crudValidators');

module.exports.getAll = async function (req, res) {
  try {
    const orders = await Orders.find({
      user: req.user,
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
      user: req.user,
    });
    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  try {
    const { title, amount } = await createSchema.validateAsync(req.body);
    const order = await Orders.create({
      title,
      amount,
      user: req.user,
    });
    res.status(200).json(order);
  } catch (error) {
    error._original ? res.status(422).json(error) : errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {
  try {
    const { title, amount } = await updateSchema.validateAsync(req.body);
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, amount } },
      {
        new: true,
      }
    );
    res.status(200).json(order);
  } catch (error) {
    error._original ? res.status(422).json(error) : errorHandler(res, error);
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
