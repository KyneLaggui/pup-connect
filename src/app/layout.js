"use client";
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
import { Provider } from "react-redux";
import SupabaseReduxSynch from "@/layouts/SupabaseReduxSynch";
import store from "@/redux/store";
import VerificationCheck from "./layouts/VerificationCheck";
import { Suspense } from "react";
import Loading from "./loading";

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

// export const metadata = {
//   title: "PUP Connect",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Provider store={store}>
          <SupabaseReduxSynch>
            <LoggedOutOnlyComponent>
              <NavBar />
            </LoggedOutOnlyComponent>
            <LoggedInOnlyComponent>
              <Sidebar />
            </LoggedInOnlyComponent>
              <Suspense fallback={<Loading />}>{children}</Suspense>
          </SupabaseReduxSynch>
        </Provider>
      </body>
    </html>
  );
}
