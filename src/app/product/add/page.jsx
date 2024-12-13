import Layout from "../../../components/layout/layout";
import AddProductComponent from "../../../components/pages/product/addProduct";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}product/add`),
  title: "Add Product",
  description: "Add Product",
  openGraph: {
    title: "Add Product | KelolaProduk",
    description: "Add Product",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL + "product/add",
    siteName: "KelolaProduk",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL + "product/add",
  },
};

export default function AddProduct() {
  return (
    <Layout>
      <div>
        <AddProductComponent />
      </div>
    </Layout>
  );
}
