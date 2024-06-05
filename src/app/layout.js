import { Rubik } from "next/font/google";
import "./globals.css";
import "./globalicon.css";
import localFont from "next/font/local";
import Sidebar from "./custom_components/Sidebar";
import NavBar from "./custom_components/NavBar";
import {
  LoggedInOnlyComponent,
  LoggedOutOnlyComponent,
} from "./layouts/ComponentRestrictions";
import VerificationCheck from "./layouts/VerificationCheck";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
        <LoggedOutOnlyComponent>
          <NavBar />
        </LoggedOutOnlyComponent>
        <LoggedInOnlyComponent>
          <Sidebar />
        </LoggedInOnlyComponent>
        {children}
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
