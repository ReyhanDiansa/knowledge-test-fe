import Layout from "../../../../components/layout/layout";
import EditCategoryComponent from "../../../../components/pages/category/editCategory";

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}category/edit/${id}`
    ),
    title: "Edit Category",
    description: "Edit Product Category",
    openGraph: {
      title: "Edit Category | KelolaProduk",
      description: "Edit Product Category",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "category/edit/" + id,
      siteName: "KelolaProduk",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + "category/edit/" + id,
    },
  };
}

export default function EditCategory() {
  return (
    <Layout>
      <div>
        <EditCategoryComponent />
      </div>
    </Layout>
  );
}
