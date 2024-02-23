import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import db from "./config/Database.js";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import IncomesRoute from "./routes/IncomeRoute.js"; 
import ArticleRoute from "./routes/ArticleRoute.js";
import CategoriRoute from "./routes/CategoriRoute.js";
import ExpenditureRoute from "./routes/ExpenditureRoute.js";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log('Database Connected...');
} catch (error) {
  console.error('Error connecting to the database:', error);
}

// (async()=>{
//     await db.sync();
// })()

// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173'
// }));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(UsersRoute); // Tambahkan path untuk UsersRoute
app.use(AuthRoute);
app.use(IncomesRoute); 
app.use(ArticleRoute);
app.use(CategoriRoute);
app.use(ExpenditureRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Up And Running...`)
});
