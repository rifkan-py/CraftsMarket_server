const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orderSchema);
