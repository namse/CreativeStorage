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
        <ul id="file-list">
          {this.state.fileMetadataList.map((fileMetadata) => (
            <li
              role={DownloadFileComponent.listItemRole}
              className="file-list-item"
              key={`file-list-li-${fileMetadata.filename}`}
            >
              <input type="checkbox"></input>
              <span>{fileMetadata.filename}</span>
              <button
                type="submit"
                onClick={() =>
                  this.handleClickDownloadButton(fileMetadata.filename)
                }
              >
                download
              </button>
              <button
                type="submit"
                // onClick={}
              >
                delete(not implemented yet)
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private async handleClickDownloadButton(filename: string) {
    const downloadUrl: string = await this.props.fileManager.getDownloadUrl(
      filename,
    );
    return downloadUrl;
  }
}
