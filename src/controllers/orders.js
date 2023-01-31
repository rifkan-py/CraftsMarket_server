const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  return res.status(200).json(orders);
});

const singleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  return res.status(200).json(order);
});

const deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  return res.status(200).json("deleted");
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  return res.status(200).json(order);
});

module.exports = {
  allOrders,
  singleOrder,
  deleteOrder,
  updateOrder,
};
