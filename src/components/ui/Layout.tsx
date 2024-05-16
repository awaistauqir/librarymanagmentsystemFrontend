import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
