import * as React from "react";
import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";

type HomePagePropsType = {};
type State = {};

export default class HomePage extends React.Component<
  HomePagePropsType,
  State
> {
  private downloadFilePage: React.RefObject<DownloadFilePage>;
  public constructor(props: HomePagePropsType) {
    super(props);
    this.downloadFilePage = React.createRef();
  }

  public render() {
    const invisible = {
      display: "none",
    };
    const visible = {};
    return (
      <div className="home-page">
        <button onClick={() => this.handleClickedButtonDownload()}>
          Download
        </button>
        <button onClick={() => this.handleClickedButtonUpload()}>Upload</button>
        <div className="download-page" style={visible}>
          <DownloadFilePage ref={this.downloadFilePage} />
        </div>
        <div className="upload-page" style={invisible}>
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
    if (this.downloadFilePage.current !== null) {
      this.downloadFilePage.current.update();
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
