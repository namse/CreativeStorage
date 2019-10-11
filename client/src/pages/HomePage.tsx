import * as React from "react";
import "src/stylesheets/HomePage.css";

import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faCloudDownloadAlt,
} from "@fortawesome/free-solid-svg-icons";

type HomePageStateType = {
  currentPage: string;
  downloadComponent: HTMLElement | null;
  uploadComponent: HTMLElement | null;
};
export default class HomePage extends React.Component<{}, HomePageStateType> {
  private downloadFilePage: React.RefObject<DownloadFilePage>;
  public constructor(props: {}) {
    super(props);
    this.downloadFilePage = React.createRef();
    this.state = {
      currentPage: "",
      downloadComponent: null,
      uploadComponent: null,
    };
    this.onClickDownloadButton = this.onClickDownloadButton.bind(this);
    this.onClickUploadButton = this.onClickUploadButton.bind(this);
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
      <div>
        <img
          alt="upload"
          className="logo-icon"
          src="http://icons.iconarchive.com/icons/vexels/office/72/bulb-icon.png"
        />
        <div className="logo">Creative Storage</div>
        {this.makeDownloadButton()}
        <div className="button-wrapper">{this.makeUploadButton()}</div>
        <div className="download-page" style={visible}>
          <DownloadFilePage ref={this.downloadFilePage} />
        </div>
        <div className="upload-page" style={invisible}>
          <UploadFilePage />
        </div>
      </div>
    );
  }

  private onClickDownloadButton() {
    this.setState({
      currentPage: "download",
    });
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

  private onClickUploadButton() {
    this.setState({
      currentPage: "upload",
    });
    if (this.state.downloadComponent !== null) {
      this.state.downloadComponent.setAttribute("style", "display: none;");
    }
    if (this.state.uploadComponent !== null) {
      this.state.uploadComponent.setAttribute("style", "");
    }
  }

  private makeDownloadButton(): JSX.Element {
    return (
      <div className="button-wrapper">
        <button
          className={`route-button hover ${this.state.currentPage ===
            "download" && "clicked"}`}
          value="download"
          onClick={this.onClickDownloadButton}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faCloudDownloadAlt} size="3x" />
          </span>
          <span className="button-text">Download</span>
        </button>
      </div>
    );
  }

  private makeUploadButton(): JSX.Element {
    return (
      <div className="Upload-button">
        <button
          className={`route-button hover ${this.state.currentPage ===
            "upload" && "clicked"}`}
          value="upload"
          onClick={this.onClickUploadButton}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
          </span>
          <span className="button-text">Upload</span>
        </button>
      </div>
    );
  }
}
