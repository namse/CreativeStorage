import React, { Component } from "react";
import FileListComponent from "src/components/FileListComponent";
import HeaderComponent from "src/components/HeaderComponent";
import MockFileManager from "src/FileManager/MockFileManager";

export default class App extends Component {
  public render() {
    return (
      <div>
        <HeaderComponent />
        <FileListComponent fileManager={new MockFileManager()}>
          {" "}
          /
        </FileListComponent>
      </div>
    );
  }
}
