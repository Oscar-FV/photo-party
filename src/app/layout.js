import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

// Carga la fuente Outfit
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Photo Party",
  description: "Created and developed by Ttete",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="fiestaTheme" lang="en">
      <Providers>
        <body suppressHydrationWarning={true}  className={`${outfit.variable} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
