import { title } from "process";
import DetailOrder from "./_components/detail-order";
import Script from "next/script";
import { environment } from "@/configs/environment";

export const metadata = {
  title: "FAI Cafe | Detail Order Management",
};

declare global {
  interface Window {
    snap: any;
  }
}

export default async function OrderManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full">
      <Script
        src={`${environment.NEXT_PUBLIC_MIDTRANS_API_URL}/snap/snap.js`}
        data-client-key={environment.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <DetailOrder id={id} />
    </div>
  );
}
