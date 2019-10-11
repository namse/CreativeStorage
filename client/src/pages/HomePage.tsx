import * as React from "react";
import UploadFilePage from "src/pages/UploadFilePage";
import DownloadFilePage from "src/pages/DownloadFilePage";
import S3FileManager from "src/FileManager/S3FileManager";
import IFileManager from "src/FileManager/IFileManager";

type HomePagePropsType = {};
type HomePageStatesType = {
  downloadComponent: HTMLElement | null;
  uploadComponent: HTMLElement | null;
  lifecycle: number;
};

export default class HomePage extends React.Component<
  HomePagePropsType,
  HomePageStatesType
> {
  private downloadFilePage: React.RefObject<DownloadFilePage>;
  private fileManager: IFileManager;

  public constructor(props: HomePagePropsType) {
    super(props);
    this.downloadFilePage = React.createRef();
    this.state = {
      downloadComponent: null,
      uploadComponent: null,
      lifecycle: 0,
    };
    this.fileManager = new S3FileManager();
  }

  public async componentDidMount() {
    const lifeCycleRule = await this.fileManager.getLifecycleConfiguration();
    this.setState({
      downloadComponent: document.querySelector(".download-page"),
      uploadComponent: document.querySelector(".upload-page"),
      lifecycle: lifeCycleRule.Transitions[0].Days,
    });
  }

  public render() {
    const invisible = {
      display: "none",
    };
    const visible = {};
    return (
      <div className="home-page">
        <div>
          <button onClick={() => this.handleClickedButtonDownload()}>
            Download
          </button>
          <button onClick={() => this.handleClickedButtonUpload()}>
            Upload
          </button>
        </div>
        <div>
          <span className="lifecycle">
            {this.state.lifecycle}일 후에 Deep-Archive로 이동
          </span>
        </div>
        <div>
          <select className="select-lifecycle">
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
            <option value="150">150</option>
            <option value="180">180</option>
          </select>
          <button onClick={() => this.handleClickedChangeLifeCyclePeriod()}>
            기간 변경
          </button>
        </div>
        <div className="download-page" style={visible}>
          <DownloadFilePage ref={this.downloadFilePage} />
        </div>
        <div className="upload-page" style={invisible}>
          <UploadFilePage />
        </div>
      </div>
    );
  }

  private async handleClickedChangeLifeCyclePeriod() {
    const elInputPeriod = document.querySelector(
      ".select-lifecycle",
    ) as HTMLSelectElement;
    const periodToChange = Number(elInputPeriod.value);
    console.log(periodToChange);
    const response = await this.fileManager.changeLifecycle(periodToChange);
    const lifeCycleRule = await this.fileManager.getLifecycleConfiguration();
    console.log(lifeCycleRule.Transitions[0].Days);
    this.setState((prevState) => ({
      lifecycle: lifeCycleRule.Transitions[0].Days,
    }));
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
