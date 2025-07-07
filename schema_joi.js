const Joi = require('joi');

const carSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  image: Joi.any(),
  description: Joi.string().required(),
  km_driven: Joi.number().min(0).required(),
  present_price: Joi.number().min(0).required()
});

const carDetailSchema = Joi.object({
  numberPlate: Joi.string().required(),
  color: Joi.string().required(),
  fuel_type: Joi.string().valid('Petrol', 'Diesel', 'CNG').required(),
  seller_type: Joi.string().valid('Dealer', 'Trustmark Dealer', 'Individual').required(),
  transmission: Joi.string().valid('Manual', 'Automatic').required(),
  owner: Joi.string().valid(
    'First Owner',
    'Second Owner',
    'Third Owner',
    'Fourth Owner',
    'Fourth & Above Owner'
  ).required(),
  service_cost: Joi.number().min(0).required(),
  modifications: Joi.string().valid('Yes', 'No').required(),
  accidents: Joi.string().valid('Yes', 'No').required(),
  insurance_valid: Joi.string().valid('Yes', 'No').required(),
  service_history: Joi.string().valid('Incomplete', 'Partial', 'Complete').required(),
  // mileage: Joi.number().min(0).optional()  // only for display, not prediction
});

const listingSchema = Joi.object({
  car: carSchema.required(),
  carDetail: carDetailSchema.required()
});

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required()
});

module.exports = { listingSchema, reviewSchema };
