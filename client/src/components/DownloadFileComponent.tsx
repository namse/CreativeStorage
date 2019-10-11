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
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickDownload = this.onClickDownload.bind(this);
  }

  public async componentDidMount() {
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  public render() {
    return (
      <div>
        {this.state.fileMetadataList.map((fileMetadata) => (
          <div
            role={DownloadFileComponent.listItemRole}
            className="file-list-item"
            key={`file-list-li-${fileMetadata.key}`} // fileMetaData.Key
          >
            <div className="download-filename">{fileMetadata.key}</div>
            <div className="show-download-fullname">{fileMetadata.key}</div>
            <span className="download-button-wrapper">
              <button
                role="download-button"
                className="download-button"
                value={`${fileMetadata.key}`}
                onClick={this.onClickDownload}
              >
                donwload
              </button>

              <button
                role="delete-button"
                className="delete-button"
                value={`${fileMetadata.key}`}
                onClick={this.onClickDelete}
              >
                delete
              </button>
            </span>
          </div>
        ))}
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
