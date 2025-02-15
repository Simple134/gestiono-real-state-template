import type { Metadata } from "next";
import "../src/globals.css";
import Header from "@/header";
import Footer from "@/footer";
import StyledComponentsRegistry from "./registry";
import { StoreProvider } from "@/components/store";




export const metadata: Metadata = {
  title: "Emira",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}

