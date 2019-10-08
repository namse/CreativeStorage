import * as React from "react";
import "src/stylesheets/DownloadFileComponent.css";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

type DownloadFileComponentPropsType = {
  fileManager: IFileManager;
};

type DownloadFileComponentStateType = {
  fileMetadataList: FileMetadata[];
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
    };
  }

  public async componentDidMount() {
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  public render() {
    return (
      <div>
        <table id="file-table">
          <tbody>
            {this.state.fileMetadataList.map((fileMetadata) => (
              <tr
                role={DownloadFileComponent.listItemRole}
                className="file-list-item"
                key={`file-list-li-${fileMetadata.Key}`} // fileMetaData.Key
              >
                <td>{fileMetadata.Key.padEnd(55, String.fromCharCode(160))}</td>
                <td>
                  <button
                    role="download-button"
                    value={`${fileMetadata.Key}`}
                    onClick={(e) => this.onClickDownload(e)}
                  >
                    다운로드
                  </button>
                </td>
                <td>
                  <button
                    role="delete-button"
                    value={`${fileMetadata.Key}`}
                    onClick={(e) => this.onClickDelete(e)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  private async onClickDelete(e: React.MouseEvent) {
    const filename = ((e.target as HTMLElement) as HTMLButtonElement).value;
    const deleteUrl = await this.props.fileManager.deleteFile(filename);
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  private async onClickDownload(e: React.MouseEvent) {
    const filename = ((e.target as HTMLElement) as HTMLButtonElement).value;
    const downloadUrl = await this.props.fileManager.getDownloadUrl(filename);

    // Create Anchor Tag to donwload file by clicking link
    const aTag = document.createElement("a");
    document.body.appendChild(aTag);

    aTag.download = filename;
    aTag.href = downloadUrl;
    aTag.click();

    aTag.remove();
  }
}
