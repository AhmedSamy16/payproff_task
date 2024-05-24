"use server";

import Customer from "@/models/Customer";
import connectDB from "@/utils/db";

const getCustomers = async () => {
  try {
    await connectDB();
    const customers = (await Customer.find().sort({
      totalSpent: -1,
    })) as Customer[];

    return { data: JSON.stringify(customers) };
  } catch (error) {
    return { messaeg: "Seomthing went wrong!!" };
  }
};

export default getCustomers;
