import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/query-provider";
import { WalletProvider } from "@/components/providers/wallet-provider";
import Header from "@/components/layout/header";
import { LoadingModal } from "@/components/modal/loading-modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fosho - Decentralized Events Manager",
  description: "Decentralized Events Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <WalletProvider>
            <QueryProvider>
              <Toaster position="top-right" richColors />
              <main className=" bg-gradient-to-b from-blue-50 to-white w-full ">
                <Header />
                <div className="w-full min-h-screen">{children}</div>
                <LoadingModal />
              </main>
            </QueryProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
