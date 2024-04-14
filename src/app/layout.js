import { Rubik } from "next/font/google";
import "./globals.css";
import "./globalicon.css";
// import NavBar from "./customComp/NavBar";
import localFont from "next/font/local";

const rubik = Rubik({ subsets: ["latin"] });

const myFont = localFont({
  src: [
    {
      path: "../fonts/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "PUP Connect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
