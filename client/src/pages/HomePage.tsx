import * as React from "react";
import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";

type HomePagePropsType = {};
type HomePageStatesType = {
  downloadComponent: HTMLElement | null;
  uploadComponent: HTMLElement | null;
};

export default class HomePage extends React.Component<
  HomePagePropsType,
  HomePageStatesType
> {
  private downloadFilePage: React.RefObject<DownloadFilePage>;
  public constructor(props: HomePagePropsType) {
    super(props);
    this.downloadFilePage = React.createRef();
    this.state = {
      downloadComponent: null,
      uploadComponent: null,
    };
  }

  public componentDidMount() {
    this.setState({
      downloadComponent: document.querySelector(".download-page"),
      uploadComponent: document.querySelector(".upload-page"),
    });
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
    if (this.state.downloadComponent !== null) {
      this.state.downloadComponent.setAttribute("style", "");
    }
    if (this.state.uploadComponent !== null) {
      this.state.uploadComponent.setAttribute("style", "display: none;");
    }
    if (this.downloadFilePage.current !== null) {
      this.downloadFilePage.current.update();
    }
  }

  private handleClickedButtonUpload() {
    if (this.state.downloadComponent !== null) {
      this.state.downloadComponent.setAttribute("style", "display: none;");
    }
    if (this.state.uploadComponent !== null) {
      this.state.uploadComponent.setAttribute("style", "");
    }
  }
}
