import {
  Sequelize
} from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {
  DataTypes
} = Sequelize;

const Incomes = db.define('incomes', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true // tidak boleh bernilai empty string
    }
  },
  total_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description_of_entry: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true
});

Users.hasMany(Incomes);
Incomes.belongsTo(Users, {foreignKey: 'userId'});

export default Incomes;