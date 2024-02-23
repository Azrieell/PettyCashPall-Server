import {
  Sequelize
} from "sequelize";
import db from "../config/Database.js";

const {
  DataTypes
} = Sequelize;

const Categori = db.define('categori', {
  income_category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  expenditure_category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true
});

export default Categori;