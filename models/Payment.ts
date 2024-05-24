import mongoose from "mongoose";
// @ts-ignore
import { loadType } from "mongoose-currency";
loadType(mongoose);

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      // @ts-ignore
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v: number) => v / 100,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "approved"],
      default: "pending",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
  },
  {
    toJSON: { getters: true },
  }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
