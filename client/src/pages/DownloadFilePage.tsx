import * as React from "react";
import DownloadFileComponent from "src/components/DownloadFileComponent";
import S3FileManager from "src/FileManager/S3FileManager";

type DownloadFilePagePropsType = {};
export default class DownloadFilePage extends React.Component<
  DownloadFilePagePropsType
> {
  private downloadFileComponent: React.RefObject<DownloadFileComponent>;
  public constructor(props: DownloadFilePagePropsType) {
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
        Download Files
        <DownloadFileComponent
          fileManager={new S3FileManager()}
          ref={this.downloadFileComponent}
        ></DownloadFileComponent>
      </div>
    );
  }
}
