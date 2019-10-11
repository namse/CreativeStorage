import * as React from "react";
import IFileManager from "src/FileManager/IFileManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "uuid/v5";
import "src/stylesheets/UploadFileComponent.css";
import {
  faSearch,
  faShareSquare,
  faBackspace,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

type State = {
  files: File[];
  uploading: boolean;
};

type UploadFilePagePropsType = {
  fileManager: IFileManager;
};

export default class UploadFileComponent extends React.Component<
  UploadFilePagePropsType,
  State
> {
  private isFileUploadStarted: boolean = false;
  private isAllFilesUploaded: boolean = false;
  private fileInputRef: React.RefObject<HTMLInputElement>;
  private filesToUpload: React.RefObject<HTMLLIElement>;

  public constructor(props: UploadFilePagePropsType) {
    super(props);
    this.fileInputRef = React.createRef();
    this.filesToUpload = React.createRef();
    this.state = {
      files: [],
      uploading: false,
    };
    // this.fileListItems = []

    this.onClickClearList = this.onClickClearList.bind(this);
    this.handleFileAdded = this.handleFileAdded.bind(this);
    this.sendFiles = this.sendFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.checkFileUploadDone = this.checkFileUploadDone.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.checkFileUploadStarted = this.checkFileUploadStarted.bind(this);
  }
  public render() {
    return (
      <div className="upload">
        <input
          ref={this.fileInputRef}
          role="file-input"
          className="file-input"
          type="file"
          multiple
          onChange={this.handleFileAdded}
        />
        <div className="button-wrapper">
          <div
            className={`browser-button ${this.state.uploading === true &&
              "button-blur"}`}
            onClick={this.openFileDialog}
          >
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} size="2x" />
              <span className="search-text">search</span>
            </div>
          </div>
          <button
            onClick={this.onClickClearList}
            className={`clear-file-button
          ${this.state.uploading === true && "button-blur"}`}
          >
            <div className="clear-icon">
              <FontAwesomeIcon icon={faBackspace} size="2x" />
              <span className="clear-text">clear</span>
            </div>
          </button>
          <button
            onClick={this.sendFiles}
            className={`send-file-button ${this.state.uploading === true &&
              "button-blur"}`}
            role="send-file"
          >
            <div className="clear-icon">
              <FontAwesomeIcon icon={faShareSquare} size="2x" />
              <span className="clear-text">send</span>
            </div>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="cancel-upload-button"
          >
            <div className="cancel-icon">
              <FontAwesomeIcon icon={faBan} size="2x" />
              <span className="cancel-text">uploadCancel</span>
            </div>
          </button>
        </div>
        <ul className="file-list">{this.makefileListItems()}</ul>
      </div>
    );
  }

  private handleFileAdded(event: React.ChangeEvent<HTMLInputElement>) {
    this.isAllFilesUploaded = this.checkFileUploadDone();
    this.isFileUploadStarted = this.checkFileUploadStarted();

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
    this.setState({ uploading: true });
    this.isAllFilesUploaded = this.checkFileUploadDone();
    this.isFileUploadStarted = this.checkFileUploadStarted();
    if (this.isFileUploadStarted && !this.isAllFilesUploaded) {
      this.openPopUp();
    } else {
      const promises = this.state.files.map((file) => this.sendRequest(file));
      await Promise.all(promises);
      this.setState({ uploading: false });
    }
  }

  private async sendRequest(file: File): Promise<void> {
    await this.props.fileManager.uploadFile(file);
  }

  private onClickClearList(): void {
    this.isAllFilesUploaded = this.checkFileUploadDone();
    this.isFileUploadStarted = this.checkFileUploadStarted();
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
    const fileListToUpload = document.querySelectorAll(".file-name");

    if (fileListToUpload.length !== 0) {
      this.isFileUploadStarted = Array.from(fileListToUpload).every((liTag) => {
        // it's not started file transfer yet
        if ((liTag.children[0] as HTMLSpanElement).innerText !== "") {
          return true;
        }
      });
    }

    return this.isFileUploadStarted;
  }

  private checkFileUploadDone() {
    if (this.filesToUpload.current !== null) {
      const fileListToUpload = this.filesToUpload.current.querySelectorAll(
        ".file-name",
      );

      if (fileListToUpload.length !== 0) {
        this.isAllFilesUploaded = Array.from(fileListToUpload).every(
          (liTag) => {
            if (
              (liTag.children[0] as HTMLSpanElement).innerText ===
              "percentage : 100.00"
            ) {
              // it's not completed file transfer yet
              return true;
            }
          },
        );
      } else {
        this.isAllFilesUploaded = true;
      }

      return this.isAllFilesUploaded;
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

  private openFileDialog(): void {
    if (this.fileInputRef.current !== null) {
      this.fileInputRef.current.click();
    }
  }

  private makefileListItems(): JSX.Element[] {
    return this.state.files.map((file) => {
      const progressTagClassName = uuid(file.name, Array(16))
        .replace(/\./g, "")
        .replace(/\-/g, "");
      return (
        <li
          key={`file-${file.name}`}
          className="file-name"
          role="file-name"
          ref={this.filesToUpload}
        >
          <span className="percentage">
            <span className={progressTagClassName}></span>
          </span>
          <div className="upload-filename">{file.name}</div>

          <div className="upload-full-filename">{file.name}</div>
        </li>
      );
    });
  }
}
