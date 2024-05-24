import mongoose from "mongoose";
// @ts-ignore
import { loadType } from "mongoose-currency";
loadType(mongoose);

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    totalSpent: {
      // @ts-ignore
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v: number) => v / 100,
    },
  },
  {
    toJSON: { getters: true },
  }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
