import Layout from "../../../components/layout/layout";
import AddCategoryComponent from "../../../components/pages/category/addCategory";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}category/add`),
  title: "Add Category",
  description: "Add Product Category",
  openGraph: {
    title: "Add Category | KelolaProduk",
    description: "Add Product Category",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL + "category/add",
    siteName: "KelolaProduk",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL + "category/add",
  },
};

export default function AddCategory() {
  return (
    <Layout>
      <div>
        <AddCategoryComponent />
      </div>
    </Layout>
  );
}
