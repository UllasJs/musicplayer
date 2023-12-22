import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";

function Home() {
  const location = useLocation();

  // Use URLSearchParams to get the value of id from the search parameters
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  console.log(userId);

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default Home;
