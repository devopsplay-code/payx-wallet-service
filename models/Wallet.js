import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  cardNumber: { type: String, default: "1234 5678 9012 3456" },
  cardName: { type: String, default: "JOHN DOE" },
  cardExpiry: { type: String, default: "12/25" },
}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
