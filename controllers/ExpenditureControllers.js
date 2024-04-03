import Expenditure from "../models/ExpenditureModel.js";

export const getAllExpenditure = async (req, res) => {
  try {
    const expenditure = await Expenditure.findAll({
      where: {
        userId: req.userId
      }
    });
    res.status(200).json(expenditure);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};  

export const getExpenditureByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const expenditure = await Expenditure.findAll({
      where: {
        userId: userId
      }
    });
    res.status(200).json(expenditure);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

export const createExpenditure = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      total_expenditure,
      date_expenditure,
      description_expenditure
    } = req.body;

    const newExpenditure = await Expenditure.create({
      total_expenditure: total_expenditure,
      date_expenditure: date_expenditure,
      description_expenditure: description_expenditure,
      userId: userId
    });

    res.status(201).json({
      msg: "Expenditure created successfully",
      expenditure: newExpenditure
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};

export const updateExpenditure = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      total_expenditure,
      date_expenditure,
      description_expenditure
    } = req.body;
    const expenditureId = req.params.id;

    const income = await Expenditure.findOne({
      where: {
        id: expenditureId,
        userId: userId
      }
    });

    if (!income) {
      return res.status(404).json({
        msg: "Income not found"
      });
    }

    await Expenditure.update({
      total_expenditure: total_expenditure,
      date_expenditure: date_expenditure,
      description_expenditure: description_expenditure
    }, {
      where: {
        id: expenditureId
      }
    });

    res.status(200).json({
      msg: "Income updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message
    });
  }
};

export const deleteExpenditure = async (req, res) => {
  try {
    const userId = req.userId;
    const expenditureId = req.params.id;

    const expenditure = await Expenditure.findOne({
      where: {
        id: expenditureId,
        userId: userId
      }
    });

    if (!income) {
      return res.status(404).json({
        msg: "Income not found"
      });
    }

    await Expenditure.destroy({
      where: {
        id: expenditureId
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