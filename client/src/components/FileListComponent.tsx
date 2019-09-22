import * as React from "react";
// import downloadFille from "../share/downloadFile";
// import "../stylesheet/ListComponent.css";
import MockFileManager from "../FileManager/MockFileManager";
import path from "path";
import IFileManager from "src/FileManager/IFileManager";

type ListComponentPropsType = {
  fileManager: IFileManager;
};

type ListComponentStateType = {
  fileList: File[];
};

export default class ListComponent extends React.Component<
  ListComponentPropsType,
  ListComponentStateType
> {
  public static readonly listItemRole: string = "file-list-item";
  private constructor(props: ListComponentPropsType) {
    super(props);
    this.state = {
      fileList: []
    };
  }
  public async componentDidMount(): Promise<void> {
    this.props.fileManager.startDownloadFile(filename);

    const filePathList: string[] = (() => {
      const pathList: string[] = [];
      for (let i = 0; i <= 3; i++) {
        pathList[i] = path.resolve(
          __dirname,
          `../FileManger/mockfile/file${i}.mp4`
        );
      }
      return pathList;
    })();
    for (const filePath of filePathList) {
      const file = new File([`${filePath}`], `${filePath}`);
      const filename: RegExpMatchArray | null = file.name.match(
        /[-_\w]+[.][\w]+$/i
      );
      if (filename) {
        const uploadFile = await this.mockFileManager.uploadFile(
          filename[0],
          file
        );
      }
    }
    this.setState({
      fileList: await this.mockFileManager.getFileList()
    });
    return Promise.resolve();
  }
  public render() {
    return (
      <div>
        <ul id="file-list">
          {this.state.fileList && console.log("a")}
          {this.state.fileList.map((file) => (
            <li
              role={ListComponent.listItemRole}
              className="file-item"
              key={`file-list-li-${file.name}`}
            >
              <form>
                <input type="checkbox" />
                <span className="file-name">{file.name}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="file-updated-at">TODO: get updated date</span>
                <button
                  type="button"
                  className="button-download-item"
                  onClick={() => this.mockFileManager.downloadFile}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="button-delete-item"
                  onClick={this.handleClickDeleteButton}
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // private handleClickDownloadButton = (e: React.MouseEvent) => {
  //   const targetElement = e.target as HTMLElement;
  //   const parent = targetElement.parentElement as HTMLElement;
  //   const filename = parent.children[1].innerHTML;
  //   const updatedAt = parent.children[2].innerHTML;
  //   console.log(filename, updatedAt);
  //   // TODO: implement downloadFille();
  // };
  private handleClickDeleteButton = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const parent = targetElement.parentElement as HTMLElement;
    const filename = parent.children[1].innerHTML;
    const updatedAt = parent.children[2].innerHTML;
    console.log(filename, updatedAt);
    // TODO: implement deleteFile();
  };
}
