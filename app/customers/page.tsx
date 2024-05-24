import getCustomers from "@/actions/getCustomers";
import CustomersGrid from "./CustomersGrid";

const CustomersPage = async () => {
  const customers = await getCustomers();
  return (
    <CustomersGrid data={customers.data ? JSON.parse(customers.data) : []} />
  );
};

export default CustomersPage;
