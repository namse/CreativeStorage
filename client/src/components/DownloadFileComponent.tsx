import * as React from "react";
import "src/stylesheets/DownloadFileComponent.css";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

type DownloadFileComponentPropsType = {
  fileManager: IFileManager;
};

type DownloadFileComponentStateType = {
  fileMetadataList: FileMetadata[];
  selectedFiles: string[];
};

export default class DownloadFileComponent extends React.Component<
  DownloadFileComponentPropsType,
  DownloadFileComponentStateType
> {
  public static readonly listItemRole: string = "file-list-item";

  private constructor(props: DownloadFileComponentPropsType) {
    super(props);
    this.state = {
      fileMetadataList: [],
      selectedFiles: [],
    };
    this.delay = this.delay.bind(this);
  }

  public async componentDidMount() {
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  public render() {
    return (
      <div>
        <button type="submit" onClick={() => this.onClickDownload()}>
          download
        </button>
        <button
          type="submit"
          // onClick={}
        >
          delete(not implemented yet)
        </button>
        <ul id="file-list">
          {this.state.fileMetadataList.map((fileMetadata) => (
            <li
              role={DownloadFileComponent.listItemRole}
              className="file-list-item"
              key={`file-list-li-${fileMetadata.Key}`} // fileMetaData.Key
            >
              <input
                type="checkbox"
                name={`${fileMetadata.Key}`}
                onClick={(e) => this.handleCheckbox(e)}
              ></input>
              <span>{fileMetadata.Key}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private async onClickDownload() {
    const promises = this.state.selectedFiles.map(async (filename) => {
      return await this.props.fileManager.getDownloadUrl(filename);
    });
    const downloadUrls = await Promise.all(promises);
    const aTag = document.createElement("a");
    document.body.appendChild(aTag);
    downloadUrls.forEach(async (url) => {
      // aTag.setAttribute("href", url);
      // aTag.setAttribute("target", "_blank");
      window.open(url);
      // aTag.click();
    });
    document.body.removeChild(aTag);
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private handleCheckbox(e: React.MouseEvent) {
    const checkBox = (e.target as HTMLElement) as HTMLInputElement;
    if (checkBox.checked && !this.state.selectedFiles.includes(checkBox.name)) {
      this.state.selectedFiles.push(checkBox.name);
    } else if (
      !checkBox.checked &&
      this.state.selectedFiles.includes(checkBox.name)
    ) {
      this.state.selectedFiles.splice(
        this.state.selectedFiles.indexOf(checkBox.name),
        1,
      );
    }
  }
}
