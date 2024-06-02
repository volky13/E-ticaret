import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Proptypes from "prop-types";
import { useEffect, useState } from "react";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);

  return (
    <div className="main-layout">
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};
