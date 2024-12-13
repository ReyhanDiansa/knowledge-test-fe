import Layout from "../../components/layout/layout";
import ProductComponent from "../../components/pages/product/productList"

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}product`),
  title: "Product",
  description: "List of Product",
  openGraph:{
    title: "Product | KelolaProduk",
    description: "List of Product",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'product',
    siteName:"KelolaProduk"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'product'
  }
};

export default function Product() {
  return (
    <Layout>
      <div>
        <ProductComponent />
      </div>
    </Layout>
  );
}
