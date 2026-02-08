import Joi from "joi";

export const addCarValidation = Joi.object({
  carData: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.number().required(),
    pricePerDay: Joi.number().required(),
    category: Joi.string().required(),
    seating_capacity: Joi.string().required(),
    fuel_type: Joi.string().required(),
    transmission: Joi.string().required(),
    isAvaliable: Joi.boolean().required(),
  }),
});
