import * as React from "react";
import MockFileManager from "src/FileManager/MockFileManager";
import DownloadFileComponent from "src/components/DownloadFileComponent";

export default class FileListAndDownloadPage extends React.Component {
  public render() {
    return (
      <div>
        Download Files
        <DownloadFileComponent
          fileManager={new MockFileManager()}
        ></DownloadFileComponent>
      </div>
    );
  }
}
