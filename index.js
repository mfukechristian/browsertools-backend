import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import peopleRoutes from "./routes/peopleRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/people", peopleRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
