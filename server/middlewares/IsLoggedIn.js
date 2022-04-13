const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "The user has to be logged in to view this page" });
};

const requireToBeLoggedOut = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "The user has to be logged out to view this page" });
};

const objectWeWantToExport = {
  isLoggedIn,
  requireToBeLoggedOut,
};

module.exports = objectWeWantToExport;
