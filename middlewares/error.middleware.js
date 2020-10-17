exports.wrapper = (func) => (req, res, next) => {
  try {
    func(req, res);
  } catch (error) {
    next(error);
  }
};

exports.notFoundMiddle = (req, res, next) => {
  res.status(404).render("error", {
    errHead: "Not Found",
    errBody: `The requested URL ${req.url} was not found on this server.`,
  });

  next();
};

exports.errorHandler = (err, req, res, next) => {
  res.status(400).send(err.message);
};
