import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from './asyncHandler.js';
import statusCodes from '../config/status-codes.js';

const { UNAUTHORIZED_ACCESS } = statusCodes;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // * Read the JWT from cookie
  token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      req.user = user;
      next();
    } catch (err) {
      return next(
        new ErrorResponse(
          'Not authorized, malicious token',
          UNAUTHORIZED_ACCESS
        )
      );
    }
  } else {
    return next(
      new ErrorResponse('Not authorized, no token', UNAUTHORIZED_ACCESS)
    );
  }
});

export default protect;
