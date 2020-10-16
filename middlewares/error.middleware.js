exports.notFoundMiddle = (req, res, next) => {
  res.status(404).render("error", {
    errHead: "Not Found",
    errBody: `The requested URL ${req.url} was not found on this server.`,
  });
};
