import type { Metadata } from "next";
//add new font
// import { Geist, Geist_Mono, Black_Ops_One } from "next/font/google";
import { Geist, Geist_Mono, Black_Ops_One } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import styles from './page.module.css'
import ScrollToTop from "./components/ScrollToTop";
import AuthProvider from "./components/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
/////////// add new font
const blackopsone = Black_Ops_One({
  variable: "--font-black-ops-one",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: 'ConsoleBlog | Professional Software Engineering & Web Development Blog',
  description: "Explore deep dives into web development, software engineering tutorials, and technical insights from a Front-End Developer perspective.",
  icons: {
    icon: "/favicon.png", // سيقوم بقراءتها مباشرة من مجلد public
    shortcut: "/favicon.png",
    apple: "/favicon.png", // مهم جداً لهواتف الآيفون ومتصفح Safari
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      //add new font
      // className={`${geistSans.variable} ${geistMono.variable} ${blackopsone.variable} h-full antialiased`}
      
    >
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className={`${styles.container} min-h-screen flex flex-col justify-between p-[0_60px]`}>
              <Navbar></Navbar>
              <main>
                {children}
              </main>
              <Footer></Footer>
              <ScrollToTop></ScrollToTop>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
