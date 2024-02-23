import {
  Sequelize
} from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {
  DataTypes
} = Sequelize;

const Expenditure = db.define('expenditure', {
  total_expenditure: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  date_expenditure: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description_expenditure: {
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

Users.hasMany(Expenditure);
Expenditure.belongsTo(Users, {foreignKey: 'userId'});

export default Expenditure;