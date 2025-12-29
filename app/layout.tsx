import "./globals.css";
import { Baloo_2, Nunito } from "next/font/google";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Alejandro De La Mora | AI Solutions Architect",
  description:
    "AI Solutions Architect specializing in GenAI systems, agentic workflows, and cloud deployments across AWS, GCP, and Vercel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
