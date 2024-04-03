import Articles from "../models/ArticleModel.js";

export const getArticle = async (req, res) => {
  try {
    const articles = await Articles.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createArticle = async (req, res) => {
  const { title, sub_title, content, image } = req.body;

  try {
    const newArticle = await Articles.create({ title, sub_title, content, image });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const articleId = req.params.id;
  const { title, sub_title, content, image } = req.body;

  try {
    const article = await Articles.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    await article.update({ title, sub_title, content, image });
    res.status(200).json({ msg: "Article updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Articles.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    await article.destroy();
    res.status(200).json({ msg: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
