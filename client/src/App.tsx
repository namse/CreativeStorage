import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "src/pages/HomePage";
import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";

export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route path="/" component={HomePage} />
          <Route path="/upload" component={UploadFilePage} />
          <Route path="/download" component={DownloadFilePage} />
        </div>
      </Router>
    );
  }
}
