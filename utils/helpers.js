import generator from 'generate-password';
import xss from 'xss';

const sanitize = inputData =>
  xss(inputData, {
    whiteList: {}, // empty, means filter out all tags
    stripIgnoreTag: true, // give us only our input - remove all bad stuff such as script tags
  });

const sanitizeIncomingPayload = body => {
  const sanitizeBody = {};

  for (let key in body) {
    sanitizeBody[key] = sanitize(body[key]);
  }

  return sanitizeBody;
};

const generatePassword = () =>
  generator.generate({
    length: 12,
    numbers: true,
  });

const sendResponse = (
  res,
  statusCode,
  data,
  extraKeys = null,
  token = null
) => {
  // * Control only go inside if statement if we are working with login and register routes.
  if (token) {
    const options = {
      secure: process.env.NODE_ENV !== 'development',
      maxAge: process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000, // * 30 days
      httpOnly: true,
    };

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        ...(extraKeys && extraKeys),
        success: true,
        data,
      });
  } else {
    res.status(statusCode).json({
      ...(extraKeys && extraKeys),
      success: true,
      data,
    });
  }
};

export { generatePassword, sendResponse, sanitizeIncomingPayload };
