import ExpenditureCategoryModel from "../models/ExpenditureCategoryModel.js";


export const getExpenditureCategori = async (req, res) => {
  try {
    const categori = await ExpenditureCategoryModel.findAll();
    res.status(200).json(categori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}


export const createExpenditureCategori = async (req, res) => {
  const { expenditure_category } = req.body;

  try {
    const newCategori = await ExpenditureCategoryModel.create({ expenditure_category });
    res.status(201).json(newCategori);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const updateExpenditureCategori = async (req, res) => {
  const categoryId = req.params.id;
  const { expenditure_category } = req.body;

  try {
    const categori = await ExpenditureCategoryModel.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await categori.update({ expenditure_category });
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteExpenditureCategori = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const categori = await ExpenditureCategoryModel.findByPk(categoryId);
    if (!categori) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await categori.destroy();
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
