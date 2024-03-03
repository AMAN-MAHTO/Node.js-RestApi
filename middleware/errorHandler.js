const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  // if status is given pass it, or pass the 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "VALIDATION ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHERIZED:
      res.json({
        title: "UNAUTHERIZED ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "NOT_FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log(err);
      break;
  }
};

module.exports = errorHandler;
