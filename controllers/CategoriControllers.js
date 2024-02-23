import Categori from "../models/CategoriModel.js";


export const getCategori = async (req, res) => {
  try {
    const categori = await Categori.findAll();
    res.status(200).json(categori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}


export const createCategori = async (req, res) => {
  const { income_category, expenditure_category } = req.body;

  try {
    const newCategori = await Categori.create({ income_category, expenditure_category });
    res.status(201).json(newCategori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const updateCategori = async (req, res) => {
  const categoryId = req.params.id;
  const { income_category, expenditure_category } = req.body;

  try {
    const categori = await Categori.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await categori.update({ income_category, expenditure_category });
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteCategori = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const categori = await Categori.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }


    await categori.destroy();
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
