import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";
import db from "./config/Database.js";
import UsersRoute from "./routes/usersRoute.js";
import AuthRoute from "./routes/authRoute.js";
import Profile from "./models/profiles.js";
import IncomesRoute from "./routes/incomeRoute.js";
import articleRoute from "./routes/articlesRoute.js"; 

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


app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(UsersRoute);
app.use(Profile);
app.use(AuthRoute);
app.use(IncomesRoute);
app.use(articleRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Up And Running...`)
})