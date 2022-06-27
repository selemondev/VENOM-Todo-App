const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const colors = require("colors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const { errorMiddleware } = require("./middleware/errorMiddleware");
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/api/goals",goalRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})