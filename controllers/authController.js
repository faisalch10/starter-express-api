import {
  generatePassword,
  sendResponse,
  sanitizeIncomingPayload,
} from '../utils/helpers.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import sendMail from '../mail/index.js';
import statusCodes from '../config/status-codes.js';

const { SUCCESS, CREATED, BAD_REQUEST, UNAUTHORIZED_ACCESS } = statusCodes;

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = sanitizeIncomingPayload(req.body);

  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and password', BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', UNAUTHORIZED_ACCESS));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', UNAUTHORIZED_ACCESS));
  }
  const token = user.generateJwtToken();

  sendResponse(
    res,
    SUCCESS,
    { user: { _id: user._id, email: user.email, name: user.name } },
    null,
    token
  );
});

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email } = sanitizeIncomingPayload(req.body);
  const password = generatePassword();

  const user = await User.create({ name, email, password });
  const token = user.generateJwtToken();

  const result = await sendMail({ emailAddress: user.email, password }, res);
  if (!result.success) {
    return next(new ErrorResponse(result.message, 400));
  }

  sendResponse(
    res,
    CREATED,
    { user: { _id: user._id, email: user.email, name: user.name } },
    null,
    token
  );
});
