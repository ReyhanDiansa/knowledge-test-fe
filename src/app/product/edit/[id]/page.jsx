import Layout from "../../../../components/layout/layout";
import EditProductComponent from "../../../../components/pages/product/editProduct"

export async function generateMetadata({ params }) {
  const id = (await params).id;

  return {
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}product/edit/${id}`
    ),
    title: "Edit Product",
    description: "Edit Product",
    openGraph: {
      title: "Edit Product | KelolaProduk",
      description: "Edit Product",
      type: "website",
      url: process.env.NEXT_PUBLIC_BASE_URL + "product/edit/" + id,
      siteName: "KelolaProduk",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL + "product/edit/" + id,
    },
  };
}

export default function EditProduct() {
  return (
    <Layout>
      <div>
        <EditProductComponent />
      </div>
    </Layout>
  );
}
