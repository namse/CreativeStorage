import React, { Component } from "react";
import DownloadFileComponent from "src/components/DownloadFileComponent";
import HeaderComponent from "src/components/HeaderComponent";
import MockFileManager from "src/FileManager/MockFileManager";

export default class App extends Component {
  public render() {
    return (
      <div>
        <HeaderComponent />
        <DownloadFileComponent fileManager={new MockFileManager()}>
          {" "}
          /
        </DownloadFileComponent>
      </div>
    );
  }
}
