import * as React from "react";
import "src/stylesheets/DownloadFileComponent.css";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

type DownloadFileComponentPropsType = {
  fileManager: IFileManager;
};

type DownloadFileComponentStateType = {
  fileMetadataList: FileMetadata[];
  fieldChecked: object;
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
      fieldChecked: {},
    };
  }

  public async componentDidMount() {
    await this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
    for (const prop in this.state.fileMetadataList) {
      if (this.state.fileMetadataList.hasOwnProperty(prop)) {
        this.state.fieldChecked[prop] = false;
        // this.state.fieldChecked.this.state.fileMetadataList[prop].Key = false;
      }
    }
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
                onClick={this.handleCheckbox}
              ></input>
              <span>{fileMetadata.Key}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private async handleDownloadUrl(filename: string) {
    const downloadUrl: string = await this.props.fileManager.getDownloadUrl(
      filename,
    );
    return downloadUrl;
  }

  private async onClickDownload() {
    for (const key in this.state.fieldChecked) {
      if (this.state.fieldChecked[key] === true) {
        const objectUrl = this.handleDownloadUrl(this.state.fieldChecked[key]);
        await fetch(objectUrl);
      }
    }
  }

  private handleCheckbox(e: React.MouseEvent) {
    this.state.fieldChecked[e.target.name] = !this.state.fieldChecked[
      e.target.name
    ];
  }
}
