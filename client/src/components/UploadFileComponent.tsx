import * as React from "react";
import uuid from "uuid/v5";
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
              onChange={(e) => this.handleFileAdded(e)}
            />
          </div>
          <ul className="file-list">
            {this.state.files.map((file) => {
              const progressTagClassName = uuid(file.name, Array(16))
                .replace(/\./g, "")
                .replace(/\-/g, "");
              return (
                <li
                  key={`file-${file.name}`}
                  className="file-name"
                  role="file-name"
                >
                  <span className="filename">{file.name}</span>
                  <span className={progressTagClassName}></span>
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={() => this.onClickClearList()}>clear</button>
        <button
          onClick={() => this.sendFiles()}
          className="send-file"
          role="send-file"
        >
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
        files: [...prevState.files, ...array],
      }));
    }
  }

  private async sendFiles(): Promise<void> {
    const promises = this.state.files.map((file) => this.sendRequest(file));
    await Promise.all(promises);
  }

  private async sendRequest(file: File): Promise<void> {
    await this.props.fileManager.uploadFile(file);
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
    const filenames = this.state.files.map((file) => {
      return file.name;
    });
    Array.from(files).forEach((file) => {
      if (files !== null && !filenames.includes(file.name)) {
        array.push(file);
      }
    });
    return array;
  }
}
