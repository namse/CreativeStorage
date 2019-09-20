import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={Home} />
          {/* <Route path='/Download' component={Download}/>
    <Route path='/Upload' component={Upload}/> */}
        </div>
      </Router>
    );
  }
}p

export default App; 
