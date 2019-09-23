import * as React from "react";
// import downloadFille from "../share/downloadFile";
// import "../stylesheet/ListComponent.css";
import path from "path";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";
import MockFileManager from "src/FileManager/MockFileManager";

type FileListComponentPropsType = {
  fileManager: MockFileManager;
};

type FileListComponentStateType = {
  fileMetadataList: FileMetadata[];
};

export default class FileListComponent extends React.Component<
  FileListComponentPropsType,
  FileListComponentStateType
> {
  public static readonly listItemRole: string = "file-list-item";
  private constructor(props: FileListComponentPropsType) {
    super(props);
    this.state = {
      fileMetadataList: [
        { filename: "adfasdfasdf" },
        { filename: "asdfasdfsadf" },
      ],
    };
  }
  public async componentDidMount() {
    this.setState({
      fileMetadataList: await this.props.fileManager.getFileMetadataList(),
    });
  }

  public render() {
    console.log("this is FileListComponent");
    console.log("this.state: ", this.state);
    return (
      <div>
        <ul id="file-list">
          {this.state.fileMetadataList.map((fileMetadata) => (
            <li
              role={FileListComponent.listItemRole}
              className="file-item"
              key={`file-list-li-${fileMetadata.filename}`}
            >
              <input type="checkbox"></input>
              <span>{fileMetadata.filename}</span>
              <button
                type="submit"
                onClick={() =>
                  this.handleClickDownloadButton(fileMetadata.filename)
                }
                value="download"
              />
              <button
                type="submit"
                // onClick={}
                value="delete(not implemented yet)"
              />
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
    this.props.fileManager.letBrowserStartDownload(filename, downloadUrl);
  }
}
