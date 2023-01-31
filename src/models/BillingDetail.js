const mongoose = require("mongoose");

const BillingDetailSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: Number,
    required: true,
  },
  billingAddress: {
    type: Number,
    required: true,
  },
});

const BillingDetailModel = mongoose.model(
  "billing_details",
  BillingDetailSchema
);
