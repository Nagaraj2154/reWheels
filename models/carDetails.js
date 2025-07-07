const mongoose = require('mongoose');

const carDetailsSchema = new mongoose.Schema({
  numberPlate: String,
  color: String,
  fuel_type: String, // ⬅️ matches form & prediction input
  mileage: Number,   // ✅ used for display, not prediction
  present_price: Number, // ✅ required for prediction
  seller_type: String,
  transmission: String,
  owner: String,
  service_cost: Number,
  modifications: String, // ⬅️ not array, just 'Yes' or 'No'
  accidents: String,
  insurance_valid: String,
  service_history: String,
  predicted_price: Number, // ✅ result from ML
  salesLetter: String
});

module.exports = mongoose.model("CarDetail", carDetailsSchema);
