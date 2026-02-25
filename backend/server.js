import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./db/db.js";
import app from "./app.js";

const PORT = process.env.PORT;

connectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));