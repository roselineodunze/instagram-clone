import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../pages/homepage/components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const renderSidebar = pathname !== "/auth" && user;
  const renderNavbar = !user && !loading && pathname !== "/auth";

  return (
    <div className={`h-dvh min-h-dvh flex ${renderNavbar ? "flex-col" : ""}`}>
      {/* sidebar */}
      {renderSidebar ? (
        <div className="w-[70px] md:w-[240px] h-full">
          <Sidebar />
        </div>
      ) : null}

      {/* navbar */}
      {renderNavbar ? <Navbar /> : null}

      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
};

export default PageLayout;
