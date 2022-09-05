import React from "react";
import NavigationBar from "../../components/NavigationBar";

function Layout({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}

export default Layout;
