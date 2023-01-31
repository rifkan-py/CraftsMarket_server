const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const { s3Upload } = require("../utils/s3-upload");

const allProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json(products);
});

const singleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  // delete image from AWS

  await Product.findByIdAndDelete(req.params.id);
  return res.status(202).json({ message: "deleted success" });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  return res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  // upload image
  const product = await Product.create({ ...req.body });
  return res.status(201).json(product);
});

const uploadImage = asyncHandler(async (req, res) => {
  const result = await s3Upload(req.files[0]);
  return res.json({ status: "success", result });
});

module.exports = {
  allProducts,
  singleProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  uploadImage,
};
