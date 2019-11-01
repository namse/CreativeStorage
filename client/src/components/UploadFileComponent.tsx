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
  private isFileUploadStarted: boolean;
  private isAllFilesUploaded: boolean;
  public constructor(props: UploadFilePagePropsType) {
    super(props);
    this.state = {
      files: [],
    };
    this.isAllFilesUploaded = false;
    this.isFileUploadStarted = false;
    this.openPopUp = this.openPopUp.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.checkFileUploadDone = this.checkFileUploadDone.bind(this);
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
          <table className="file-list">
            <tbody>
              {this.state.files.map((file) => {
                const progressTagClassName = uuid(file.name, Array(16))
                  .replace(/\./g, "")
                  .replace(/\-/g, "");
                return (
                  <tr
                    key={`file-${file.name}`}
                    className="file"
                    role="file-name"
                  >
                    <td>
                      <span className="filename">
                        {file.name.padEnd(90, String.fromCharCode(160))}
                      </span>
                    </td>
                    <td>
                      <span className={progressTagClassName}></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={() => this.onClickClearList()}>clear</button>
        <button
          onClick={() => this.sendFiles()}
          className="send-file"
          role="send-file"
        >
          send
        </button>
        <button onClick={() => window.location.reload()}>
          cancle upload(refresh)
        </button>
      </div>
    );
  }

  private handleFileAdded(event: React.ChangeEvent<HTMLInputElement>) {
    this.checkFileUploadDone();
    this.checkFileUploadStarted();

    if (this.isFileUploadStarted && this.isAllFilesUploaded) {
      this.onClickClearList();
    }

    if (this.isFileUploadStarted && !this.isAllFilesUploaded) {
      this.openPopUp();
      const inputTag = document.querySelector(
        ".file-input",
      ) as HTMLInputElement;
      inputTag.value = "";
    } else {
      const files = event.target.files;
      if (files) {
        const array = this.fileListToArray(files);
        this.setState((prevState) => ({
          files: [...prevState.files, ...array],
        }));
      }
    }
  }

  private async sendFiles(): Promise<void> {
    this.checkFileUploadDone();
    this.checkFileUploadStarted();

    if (this.isFileUploadStarted && !this.isAllFilesUploaded) {
      this.openPopUp();
    } else {
      const promises = this.state.files.map((file) => this.sendRequest(file));
      await Promise.all(promises);
    }
  }

  private async sendRequest(file: File): Promise<void> {
    await this.props.fileManager.uploadFile(file);
  }

  private onClickClearList(): void {
    this.checkFileUploadDone();
    this.checkFileUploadStarted();

    if (this.isFileUploadStarted && !this.isAllFilesUploaded) {
      this.openPopUp();
    } else {
      this.setState({ files: [] });

      const ElInputTag = document.getElementsByClassName(
        "file-input",
      )[0] as HTMLInputElement;

      ElInputTag.value = "";
    }
  }

  private openPopUp() {
    const modeless = window.open(
      "",
      "popup",
      "width=100,height=30,menubar=0,status=0,titlebar=0,top=350,left=800",
    );
    if (modeless !== null) {
      modeless.document.body.innerHTML = "";
      modeless.document.write("파일 전송이 완료될 때까지 기다려 주십시오");
    }
  }

  private checkFileUploadStarted() {
    const fileListToUpload = document.querySelectorAll(".file");

    if (fileListToUpload.length !== 0) {
      this.isFileUploadStarted = Array.from(fileListToUpload).every((liTag) => {
        // it's not started file transfer yet
        if ((liTag.children[1] as HTMLSpanElement).innerText !== "") {
          return true;
        }
      });
    } else {
      this.isFileUploadStarted = false;
    }
  }

  private checkFileUploadDone() {
    const fileListToUpload = document.querySelectorAll(".file");

    if (fileListToUpload.length !== 0) {
      this.isAllFilesUploaded = Array.from(fileListToUpload).every((liTag) => {
        if (
          (liTag.children[1] as HTMLSpanElement).innerText ===
          "percentage : 100.00"
        ) {
          // it's not completed file transfer yet
          return true;
        }
      });
    } else {
      this.isAllFilesUploaded = false;
    }
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
