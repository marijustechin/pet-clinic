const ApiError = require("../exceptions/api.error");

module.exports = function (err, req, res, next) {
  console.log(err);

  // jei klaida is klaidu klases
  // tai grazinam frontui
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  // jei ne, tai nenumatyta klaida - 500
  return res.status(500).json({ message: "Įvyko nenumatyta klaida" });
};
