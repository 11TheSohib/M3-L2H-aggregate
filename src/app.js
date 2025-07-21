import express from "express";
import { config } from "dotenv";
config();

import { connectDB } from "./db/db.js";
import indexRouter from "./routers/index.route.js";
const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
await connectDB();

app.use(`/`, indexRouter);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
