module.exports = (res, error) => {
  res.status(500).json({
    succses: false,
    message: error.message ? error.message : error,
  });
};
