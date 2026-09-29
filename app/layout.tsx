import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
const sans = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans" });
export const metadata: Metadata = {
  title: "Bharti Dhote — Product Designer",
  description: "Product designer with a strong frontend background, focused on intuitive interfaces and polished digital products.",
  openGraph: { title: "Bharti Dhote — Product Designer", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={sans.variable}><body className="font-sans antialiased">{children}</body></html>;
}
