import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "src/pages/HomePage";
import UploadFilePage from "src/pages/UploadFilePage";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/Upload" component={UploadFilePage} />
        </div>
      </Router>
    );
  }
}

export default App;
