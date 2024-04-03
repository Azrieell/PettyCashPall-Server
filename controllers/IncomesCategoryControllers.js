import IncomesCategoryModel from "../models/IncomesCategoryModel.js";


export const getIncomesCategori = async (req, res) => {
  try {
    const categori = await IncomesCategoryModel.findAll();
    res.status(200).json(categori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}


export const createIncomesCategori = async (req, res) => {
  const { income_category } = req.body;

  try {
    const newCategori = await IncomesCategoryModel.create({ income_category });
    res.status(201).json(newCategori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const updateIncomesCategori = async (req, res) => {
  const categoryId = req.params.id;
  const { income_category } = req.body;

  try {
    const categori = await IncomesCategoryModel.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await categori.update({ income_category });
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteIncomesCategori = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const categori = await IncomesCategoryModel.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await categori.destroy();
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
