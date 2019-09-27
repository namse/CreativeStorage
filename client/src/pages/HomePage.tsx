import * as React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <Link to={"/Download"}>
      <button>Download</button>
    </Link>
    <Link to={"/Upload"}>
      <button>Upload</button>
    </Link>
  </div>
);

export default HomePage;
