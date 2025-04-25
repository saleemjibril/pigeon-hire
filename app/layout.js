import "../styles/index.scss";
import { Inter, Syne, Geist } from "next/font/google";
import localFont from "next/font/local";


import ReduxProvider from './store/ReduxProvider';


const durkWide = localFont({
  src: "../public/assets/DrukWideBold.ttf",
  weight: "200 800", // For variable fonts, specify the weight range
  subsets: ["latin"],
  display: "swap",
  variable: "--font-durkwide",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});
const geist = Geist({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
       ${syne.variable} ${inter.variable} ${geist.variable} ${durkWide.variable}`}
    >
      <body>
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
