import * as React from "react";
import DownloadFileComponent from "src/components/DownloadFileComponent";
import S3FileManager from "src/FileManager/S3FileManager";

export default class FileListAndDownloadPage extends React.Component {
  public render() {
    return (
      <div>
        Download Files
        <DownloadFileComponent
          fileManager={new S3FileManager()}
        ></DownloadFileComponent>
      </div>
    );
  }
}
