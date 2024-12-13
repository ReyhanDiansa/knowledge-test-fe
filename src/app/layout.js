import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "KelolaProduk",
    template: "%s | KelolaProduk",
  },
  description:
    "KelolaProduk is a simple product management website featuring CRUD functionality for products and categories, designed for easy and efficient management",
  favicon: "/favicon.ico",
  keywords: [
    "Product",
    "Category",
    "CRUD",
    "Product",
    "Nodejs",
    "Nextjs",
    "Website",
  ],
  creator: "Reyhan Marsalino Diansa",
  publisher: "Reyhan Marsalino Diansa",
  openGraph: {
    title: "KelolaProduk",
    description:
      "KelolaProduk is a simple product management website featuring CRUD functionality for products and categories, designed for easy and efficient management",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "KelolaProduk",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
