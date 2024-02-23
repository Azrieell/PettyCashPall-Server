import Incomes from "../models/IncomeModel.js";

export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.findAll();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getIncomesByUserId = async (req, res) => {
  try {
    const userId = req.userId; // Menggunakan userId dari middleware
    const incomes = await Incomes.findAll({
      where: { userId: userId }
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createIncome = async (req, res) => {
  try {
    const userId = req.userId;
    const { total_income, date_of_entry, description_of_entry } = req.body;

    const newIncome = await Incomes.create({
      total_income: total_income,
      date_of_entry: date_of_entry,
      description_of_entry: description_of_entry,
      userId: userId 
    });

    res.status(201).json({
      msg: "Income created successfully",
      income: newIncome
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const userId = req.userId; 
    const { total_income, date_of_entry, description_of_entry } = req.body;
    const incomeId = req.params.id;

    const income = await Incomes.findOne({
      where: { id: incomeId, userId: userId }
    });

    if (!income) {
      return res.status(404).json({ msg: "Income not found" });
    }

    await Incomes.update(
      {
        total_income: total_income,
        date_of_entry: date_of_entry,
        description_of_entry: description_of_entry
      },
      {
        where: { id: incomeId }
      }
    );

    res.status(200).json({ msg: "Income updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const userId = req.userId; 
    const incomeId = req.params.id;

    const income = await Incomes.findOne({
      where: { id: incomeId, userId: userId }
    });

    if (!income) {
      return res.status(404).json({ msg: "Income not found" });
    }

    await Incomes.destroy({
      where: { id: incomeId }
    });

    res.status(200).json({ msg: "Income deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
