import * as React from "react";
import DownloadFileComponent from "src/components/DownloadFileComponent";
import FileManager from "src/FileManager/FileManager";

export default class FileListAndDownloadPage extends React.Component {
  public render() {
    return (
      <div>
        Download Files
        <DownloadFileComponent
          fileManager={new FileManager()}
        ></DownloadFileComponent>
      </div>
    );
  }
}
