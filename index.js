import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig.js";
import peopleRoutes from "./routes/peopleRoutes.js";
import peopleCategoryRoutes from "./routes/peopleCategoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/people", peopleRoutes);
app.use("/api/peopleCategories", peopleCategoryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
