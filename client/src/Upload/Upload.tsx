import * as React from "react";
import FileBrowserButton from "../FileBrowserButton/FileBrowserButton";
import MockFileManager from "src/FileManager/MockFileManager";
type State = {
  files: File[];
};

type UploadFileComponentPropsType = {
  fileManager: MockFileManager;
};

export default class Upload extends React.Component<
  UploadFileComponentPropsType,
  State
> {
  private constructor(props: UploadFileComponentPropsType) {
    super(props);
    this.state = {
      files: [],
    };
  }
  public onFilesAdded(files: File[]) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  public async sendFiles(): Promise<void> {
    const promises: Array<Promise<void>> = [];
    this.state.files.forEach((file: File) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
    }
  }

  public async sendRequest(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve(this.props.fileManager.uploadFile(file.name, file));
    });
  }

  public render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="content">
          <div>
            <FileBrowserButton onFilesAdded={this.onFilesAdded} />
          </div>
        </div>
        <button onClick={this.sendFiles}>send</button>
      </div>
    );
  }
}
