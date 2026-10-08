import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { celebrate, Joi, Segments } from "celebrate";
import User from "../models/user.js";
import { JWT_SECRET } from "../config.js";

const router = Router();

router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).send({ message: "Invalid email" });
      }

      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash });
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

      return res.status(201).send({
        token,
        user: { name: user.name, email: user.email, _id: user._id },
      });
    } catch (error) {
      return next(error);
    }
  },
);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).send({ message: "Incorrect email or password" });
      }

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return res.status(401).send({ message: "Incorrect email or password" });
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

      return res.send({
        token,
        user: { name: user.name, email: user.email, _id: user._id },
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default router;
