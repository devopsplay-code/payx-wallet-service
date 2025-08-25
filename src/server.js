import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import walletRoutes from "../routes/walletRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`${process.env.SERVICE_NAME} connected to MongoDB`))
  .catch(err => console.error("MongoDB connection error:", err));

// Mount wallet routes
app.use("/wallet", walletRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: process.env.SERVICE_NAME, version: "0.1.0" });
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Wallet service running on port ${PORT}`);
});
