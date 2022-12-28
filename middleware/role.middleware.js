// Validator for Admin Routes
const isAdmin = (req, res, next) => {
    if (req.payload.role !== "admin") {
      res.status(401).json({ errorMessage: "Only admins allowed" });
      return;
    } else {
      next();
    }
  };
  
  module.exports = {
    isAdmin,
  };
  