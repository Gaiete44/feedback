// app/layout.tsx
import type { Metadata } from "next";
import { CartProvider } from "./_context/CardContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Order App",
  description: "Order your favorite food online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}