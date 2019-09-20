import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <Link to={"/Download"}>
      <button>Download</button>
    </Link>
    <Link to={"/Upload"}>
      <button>Upload</button>
    </Link>
  </div>
);

export default Home;
