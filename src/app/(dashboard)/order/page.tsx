import { title } from "process";
import OrderManagement from "./_components/order";

export const metadata = {
  title: "FAI Cafe | Order Management",
};

export default function OrderManagementPage() {
  return <OrderManagement />;
}
