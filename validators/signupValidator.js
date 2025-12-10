const { body } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required.")
    .isAlpha()
    .withMessage("Name must only contain letters.")
    .isLength({ min: 1, max: 30 })
    .withMessage("Name must be between 1 and 30 characters"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .custom((value) => {
      const hasLetter = /[A-Za-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[^A-Za-z0-9]/.test(value);

      if (!hasLetter) {
        throw new Error("Password must contain at least one letter.");
      }

      if (!hasNumber) {
        throw new Error("Password must contain at least one number");
      }

      if (hasSpecial) {
        throw new Error("Password cannot contain special characters.");
      }

      return true;
    }),
  body("confirmPass")
    .notEmpty()
    .withMessage("Please confirm your password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

module.exports = validateUser;
