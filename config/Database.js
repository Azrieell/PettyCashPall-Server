import { Sequelize } from "sequelize";

const db = new Sequelize('pettycashpall_server', 'root', '', {
  host: "localhost",
  dialect: "mysql"
})

export default db;