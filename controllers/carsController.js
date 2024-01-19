import { sendResponse, sanitizeIncomingPayload } from '../utils/helpers.js';
import Car from '../models/Car.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import statusCodes from '../config/status-codes.js';

const { SUCCESS, CREATED, NOT_FOUND } = statusCodes;

export const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  sendResponse(res, SUCCESS, { cars }, { results: cars.length });
});

export const getCarById = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(
      new ErrorResponse(`Car not found with id of ${req.params.id}`, NOT_FOUND)
    );
  }

  sendResponse(res, SUCCESS, { car });
});

export const createCar = asyncHandler(async (req, res) => {
  const { company, color, model, make, regNo, carType } =
    sanitizeIncomingPayload(req.body);

  const car = await Car.create({ company, color, model, make, regNo, carType });

  sendResponse(res, CREATED, { car });
});

export const updateCar = asyncHandler(async (req, res) => {
  const { company, color, model, make, regNo, carType } =
    sanitizeIncomingPayload(req.body);

  const car = await Car.findById(req.params.id);

  car.company = company || car.company;
  car.color = color || car.color;
  car.model = model || car.model;
  car.make = make || car.make;
  car.regNo = regNo || car.regNo;
  car.carType = carType || car.carType;

  const updatedCar = await car.save();
  sendResponse(res, SUCCESS, { car: updatedCar });
});

export const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  await car.deleteOne();

  sendResponse(res, SUCCESS, { carId: car._id });
});
