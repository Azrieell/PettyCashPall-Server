import Incomes from "../models/IncomeModel.js";

// Mendapatkan semua pendapatan
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.findAll();

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

// Mendapatkan pendapatan berdasarkan ID pengguna
export const getIncomesByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil ID pengguna dari token atau sesi, sesuai dengan aplikasi Anda

    const incomes = await Incomes.findAll({
      where: {
        userId: userId
      }
    });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

// Membuat pendapatan baru
export const createIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil ID pengguna dari token atau sesi, sesuai dengan aplikasi Anda
    const { total_income, date_of_entry, description_of_entry } = req.body;

    // Membuat pendapatan baru
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
    res.status(400).json({
      msg: error.message
    });
  }
};

// Mengupdate pendapatan
export const updateIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil ID pengguna dari token atau sesi, sesuai dengan aplikasi Anda
    const { total_income, date_of_entry, description_of_entry } = req.body;
    const incomeId = req.params.id;

    const income = await Incomes.findOne({
      where: {
        id: incomeId,
        userId: userId
      }
    });

    if (!income) {
      return res.status(404).json({
        msg: "Income not found"
      });
    }

    // Mengupdate pendapatan
    await Incomes.update(
      {
        total_income: total_income,
        date_of_entry: date_of_entry,
        description_of_entry: description_of_entry
      },
      {
        where: {
          id: incomeId
        }
      }
    );

    res.status(200).json({
      msg: "Income updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};

// Menghapus pendapatan
export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil ID pengguna dari token atau sesi, sesuai dengan aplikasi Anda
    const incomeId = req.params.id;

    const income = await Incomes.findOne({
      where: {
        id: incomeId,
        userId: userId
      }
    });

    if (!income) {
      return res.status(404).json({
        msg: "Income not found"
      });
    }

    // Menghapus pendapatan
    await Incomes.destroy({
      where: {
        id: incomeId
      }
    });

    res.status(200).json({
      msg: "Income deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};
