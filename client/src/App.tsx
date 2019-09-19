import * as React from "react";
import Header from "./component/Header";
import List from "./component/List";
export default class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <List />
      </div>
    );
  }
}
