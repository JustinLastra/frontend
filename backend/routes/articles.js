import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import User from "../models/user.js";
import Article from "../models/article.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/users/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send({ name: user.name, email: user.email, _id: user._id });
  } catch (error) {
    return next(error);
  }
});

router.get("/articles", auth, async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id }).sort({ _id: -1 });
    return res.send(articles);
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/articles",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().allow(null, ""),
    }),
  }),
  async (req, res, next) => {
    try {
      const article = await Article.create({
        ...req.body,
        owner: req.user._id,
      });

      return res.status(201).send(article);
    } catch (error) {
      return next(error);
    }
  },
);

router.delete("/articles/:articleId", auth, async (req, res, next) => {
  try {
    const article = await Article.findOne({
      _id: req.params.articleId,
      owner: req.user._id,
    });

    if (!article) {
      return res.status(404).send({ message: "Article not found" });
    }

    await article.deleteOne();
    return res.send({ message: "Article deleted" });
  } catch (error) {
    return next(error);
  }
});

export default router;
