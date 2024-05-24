"use server";

import Payment from "@/models/Payment";
import connectDB from "@/utils/db";

const getPayments = async (page: number = 1, limit: number = 20) => {
  try {
    await connectDB();

    const payments = (await Payment.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit)) as Payment[];

    return { data: JSON.stringify(payments) };
  } catch (error) {
    return { message: "Something went wrong" };
  }
};

export default getPayments;
