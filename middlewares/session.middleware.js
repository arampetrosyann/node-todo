exports.sessionMiddle = (req, res, next) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }

  next();
};
