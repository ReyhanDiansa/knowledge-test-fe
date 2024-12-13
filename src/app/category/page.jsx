import Layout from "../../components/layout/layout";
import CategoryComponent from "../../components/pages/category/categoryList"

export const metadata = {
  metadataBase:new URL(`${process.env.NEXT_PUBLIC_BASE_URL}category`),
  title: "Category",
  description: "List of Product Category",
  openGraph:{
    title: "Category | KelolaProduk",
    description: "List of Product Category",
    type:"website",
    url:process.env.NEXT_PUBLIC_BASE_URL+'category',
    siteName:"KelolaProduk"
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL+'category'
  }
};

export default function Category() {
  return (
    <Layout>
      <div>
        <CategoryComponent />
      </div>
    </Layout>
  );
}
