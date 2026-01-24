import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Sophisticated skincare solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="app-header">
            <div className="app-logo">SKINSTRIC</div>
            <div className="app-header-action">ENTER CODE</div>
          </header>
          <main className="page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
