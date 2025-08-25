import express from "express";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Dashboard route
router.get("/dashboard/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(5);
    const totalTransactions = await Transaction.countDocuments({ userId });

    res.json({
      balance: wallet.balance,
      cardNumber: wallet.cardNumber,
      cardName: wallet.cardName,
      cardExpiry: wallet.cardExpiry,
      totalTransactions,
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Seed route (creates wallet + transactions if not exists)
router.get("/seed/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 97450,
        cardNumber: "1234 5678 9012 3456",
        cardName: "JOHN DOE",
        cardExpiry: "12/25",
      });
    }

    const existingTx = await Transaction.find({ userId });
    if (existingTx.length === 0) {
      await Transaction.insertMany([
        { userId, name: "Bessie Cooper", amount: -3000, status: "Pending" },
        { userId, name: "Eleanor Pena", amount: 1000, status: "Completed" },
        { userId, name: "Ronald Richards", amount: 3750, status: "Completed" },
      ]);
    }

    res.json({ success: true, message: "Wallet & transactions ready" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
