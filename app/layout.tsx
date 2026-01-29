import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
            <Link href="/" className="app-logo">
              SKINSTRIC{" "}
              <span className="testing-kicker-bracket">[ INTRO ]</span>
            </Link>

            <div className="app-header-action">ENTER CODE</div>
          </header>
          <main className="page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
