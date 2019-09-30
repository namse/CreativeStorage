import * as React from "react";
import IFileManager from "src/FileManager/IFileManager";
type State = {
  files: File[];
};

type UploadFilePagePropsType = {
  fileManager: IFileManager;
};

export default class UploadFileComponent extends React.Component<
  UploadFilePagePropsType,
  State
> {
  public constructor(props: UploadFilePagePropsType) {
    super(props);
    this.state = {
      files: [],
    };
    this.onClickClearList = this.onClickClearList.bind(this);
    this.handleFileAdded = this.handleFileAdded.bind(this);
    this.sendFiles = this.sendFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  public render() {
    return (
      <div className="upload">
        <span className="title">Upload Files</span>
        <div className="content">
          <div>
            <input
              role="file-input"
              className="file-input"
              type="file"
              multiple
              onChange={this.handleFileAdded}
            />
          </div>
          <ul className="file-list">
            {this.state.files.map((file) => {
              return (
                <li
                  key={`file-${file.name}`}
                  className="file-name"
                  role="file-name"
                >
                  <span className="filename">{file.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={this.onClickClearList}>clear</button>
        <button onClick={this.sendFiles} className="send-file" role="send-file">
          send
        </button>
      </div>
    );
  }

  private handleFileAdded(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const array = this.fileListToArray(files);
      this.setState((prevState) => ({
        files: prevState.files.concat(array),
      }));
    }
  }

  private async sendFiles(): Promise<void> {
    const promises: Array<Promise<void>> = this.state.files.map((file) =>
      this.sendRequest(file),
    );
    await Promise.all(promises);
    this.onClickClearList();
  }

  private async sendRequest(file: File): Promise<void> {
    await this.props.fileManager.uploadFile(file.name, file);
  }

  private onClickClearList(): void {
    this.setState({ files: [] });
    const ElInputTag = document.getElementsByClassName(
      "file-input",
    )[0] as HTMLInputElement;
    ElInputTag.value = "";
  }

  private fileListToArray(files: FileList): File[] {
    const array: File[] = [];
    Array.prototype.forEach.call(files, (file) => {
      if (files !== null) {
        array.push(file);
      }
    });
    return array;
  }
}
