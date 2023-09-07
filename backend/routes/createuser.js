const express = require("express");
const router = express.Router();
const Users = require("../models/user.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

router.post(
  "/createuser",
  [
    body("email", "email is not correct").isEmail(),
    body("password", "password length is small").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
          const salt = await bcrypt.genSalt(10);
          const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await Users.create({
        name: req.body.name,
        password:secPassword,
        email: req.body.email,
        location: req.body.location,
      });

   
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);



module.exports = router;
