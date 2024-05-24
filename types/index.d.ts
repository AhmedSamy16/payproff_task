type Customer = {
  id: string;
  fullName: string;
  city: string;
  email: string;
  totalSpent: number;
};

type Payment = {
  id: string;
  status: ["pending", "cancelled", "approved"];
  date: Date;
  amount: number;
  customerName: string;
};

type PageState = {
  isLoading: boolean;
  data: Payment[];
};
