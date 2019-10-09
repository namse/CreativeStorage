import * as React from "react";
import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";

type HomePagePropsType = {};
type FileWithTransferState = { file: File; transfered: boolean };
type State = {
  files: FileWithTransferState[];
  componentToBeRendered: string;
};

export default class HomePage extends React.Component<
  HomePagePropsType,
  State
> {
  public constructor(props: HomePagePropsType) {
    super(props);
    this.state = {
      files: [],
      componentToBeRendered: "",
    };
  }

  public render() {
    const visible = {
      display: "none",
    };
    const invisible = {};
    return (
      <div>
        <button onClick={() => this.handleClickedButtonDownload()}>
          Download
        </button>
        <button onClick={() => this.handleClickedButtonUpload()}>Upload</button>
        <div className="download-page" style={invisible}>
          <DownloadFilePage />
        </div>
        <div className="upload-page" style={visible}>
          <UploadFilePage />
        </div>
      </div>
    );
  }

  private handleClickedButtonDownload() {
    const downloadComponent = document.querySelector(".download-page");
    const uploadComponent = document.querySelector(".upload-page");
    if (downloadComponent !== null) {
      downloadComponent.setAttribute("style", "");
    }
    if (uploadComponent !== null) {
      uploadComponent.setAttribute("style", "display: none;");
    }
  }

  private handleClickedButtonUpload() {
    const downloadComponent = document.querySelector(".download-page");
    const uploadComponent = document.querySelector(".upload-page");
    if (downloadComponent !== null) {
      downloadComponent.setAttribute("style", "display: none;");
    }
    if (uploadComponent !== null) {
      uploadComponent.setAttribute("style", "");
    }
  }
}
