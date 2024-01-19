import { sendResponse, sanitizeIncomingPayload } from '../utils/helpers.js';
import Category from '../models/Category.js';
import APIFeatures from '../utils/apiFeatures.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import statusCodes from '../config/status-codes.js';

const { SUCCESS, CREATED, NOT_FOUND } = statusCodes;

export const getCategories = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const categories = await features.query;

  sendResponse(res, SUCCESS, { categories }, { results: categories.length });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(
        `Category not found with id of ${req.params.id}`,
        NOT_FOUND
      )
    );
  }

  sendResponse(res, SUCCESS, { category });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = sanitizeIncomingPayload(req.body);
  const category = await Category.create({ name });

  sendResponse(res, CREATED, { category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = sanitizeIncomingPayload(req.body);
  const category = await Category.findById(req.params.id);
  category.name = name || category.name;
  const updatedCategory = await category.save();

  sendResponse(res, SUCCESS, { category: updatedCategory });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  await category.deleteOne();

  sendResponse(res, SUCCESS, { categoryId: category._id });
});
