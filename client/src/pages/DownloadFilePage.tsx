import * as React from "react";
import DownloadFileComponent from "src/components/DownloadFileComponent";
import S3FileManager from "src/FileManager/S3FileManager";
import "src/stylesheets/DownloadFilePage.css";

export default class FileListAndDownloadPage extends React.Component<{}> {
  private downloadFileComponent: React.RefObject<DownloadFileComponent>;
  public constructor(props: {}) {
    super(props);
    this.state = {};
    this.downloadFileComponent = React.createRef();
  }

  public update() {
    if (this.downloadFileComponent.current !== null) {
      this.downloadFileComponent.current.componentDidMount();
    }
  }
  public render() {
    return (
      <div>
        <div className="download-wrapper">
        <DownloadFileComponent
          fileManager={new S3FileManager()}
          ref={this.downloadFileComponent}
        ></DownloadFileComponent>
        </div>
      </div>
    );
  }
}
