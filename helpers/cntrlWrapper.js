const cntrlWrapper = cntrl => async (req, res, next) => {
  try {
    await cntrl(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = cntrlWrapper;
