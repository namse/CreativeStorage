import * as React from "react";
import "src/stylesheets/DownloadFileComponent.css";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

type DownloadFileComponentPropsType = {
  fileManager: IFileManager;
};

type DownloadFileComponentStateType = {
  fileMetadataList: FileMetadata[];
  // selectedFiles: string[];
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
      // selectedFiles: [],
    };
    // this.delay = this.delay.bind(this);
  }

  public async componentDidMount() {
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  public render() {
    return (
      <div>
        {/* <button type="submit" onClick={() => this.onClickDownload()}>
          download
        </button>
        <button
          type="submit"
          // onClick={}
        >
          delete(not implemented yet)
        </button> */}
        <table id="file-table">
          <tbody>
            {this.state.fileMetadataList.map((fileMetadata) => (
              <tr
                role={DownloadFileComponent.listItemRole}
                className="file-list-item"
                key={`file-list-li-${fileMetadata.Key}`} // fileMetaData.Key
              >
                {/* <input
                type="checkbox"
                name={`${fileMetadata.Key}`}
                onClick={(e) => this.handleCheckbox(e)}
              ></input> */}
                <td>{fileMetadata.Key}</td>
                <td>
                  <button
                    name={`${fileMetadata.Key}`}
                    onClick={(e) => this.onClickDownload(e)}
                  >
                    다운로드
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  private async onClickDownload(e: React.MouseEvent) {
    const filename = ((e.target as HTMLElement) as HTMLButtonElement).name;
    // this.state.selectedFiles.forEach(async (filename) => {
    const downloadUrl = await this.props.fileManager.getDownloadUrl(filename);
    // const response = await fetch(downloadUrl);
    // const blob = await response.blob();
    // const localUrl = URL.createObjectURL(blob);
    const aTag = document.createElement("a");
    document.body.appendChild(aTag);
    aTag.download = filename;
    aTag.href = downloadUrl;
    aTag.click();
    // await this.delay(10000);
    aTag.remove();
    // });

    // const iframeTag = document.createElement("iframe");
    // iframeTag.style = 'display:none;';
    // document.body.appendChild(iframeTag);
    // this.state.selectedFiles.forEach(async (filename) => {
    //   const downloadUrl = await this.props.fileManager.getDownloadUrl(filename);
    //   iframeTag.src = downloadUrl;
    // });
    // document.body.removeChild(iframeTag);
  }

  // // this function for applying multiple files download
  // private delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // private handleCheckbox(e: React.MouseEvent) {
  //   const checkBox = (e.target as HTMLElement) as HTMLInputElement;
  //   if (checkBox.checked && !this.state.selectedFiles.includes(checkBox.name)) {
  //     this.state.selectedFiles.push(checkBox.name);
  //   } else if (
  //     !checkBox.checked &&
  //     this.state.selectedFiles.includes(checkBox.name)
  //   ) {
  //     this.state.selectedFiles.splice(
  //       this.state.selectedFiles.indexOf(checkBox.name),
  //       1,
  //     );
  //   }
  // }
}
