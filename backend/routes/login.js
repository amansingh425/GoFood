const express = require("express");
const router = express.Router();
const Users = require("../models/user.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "amansingh";


router.post(
    "/login",
    [
      body("email", "email is not in correct format").isEmail(),
      body("password", "password length is small").isLength({ min: 5 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await Users.findOne({ email: email });
        if (!data) {
          return res.status(400).json({ error: "invalid login details" });
        }
        const pwdCompare = await bcrypt.compare(password, data.password)
        if (!pwdCompare) {
          return res.status(400).json({ error: "invalid login details" });
        }

        const jdata = {
            user:{
              id:data._id
            }
          }
          const authToken = jwt.sign(jdata, jwtSecret);                 
        return res.json({ success: true, authToken: authToken });     
      } catch (err) {
        console.log(err);
        res.json({ success: false });
      }
    }
  );
  
  module.exports = router;