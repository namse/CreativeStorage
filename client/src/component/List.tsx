import * as React from "react";
import downloadFille from "../share/downloadFile";
// import "../stylesheet/List.css";

export default class List extends React.Component {
  // TODO: get file list from server - get from another component through prop

  public state = {
    files: [
      { name: "file1111", updatedAt: "20190101" },
      { name: "file2222", updatedAt: "20190102" },
      { name: "file33231", updatedAt: "20190103" },
      { name: "file444213", updatedAt: "20190104" },
      { name: "file551232", updatedAt: "20190105" },
      { name: "file66124123", updatedAt: "20190106" },
      { name: "file77134", updatedAt: "20190107" },
      { name: "file881241", updatedAt: "20190108" },
      { name: "file9912312", updatedAt: "20190109" },
    ],
  };
  private constructor(props: any) {
    super(props);
  }

  public render() {
    const files = this.state.files;
    return (
      <div>
        <ul id="file-list">
          {this.state.files.map((file) => (
            <li
              className="file-item"
              key={JSON.stringify(file.name + file.updatedAt)}
            >
              <form>
                <input type="checkbox" />
                <span className="file-name">{file.name}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="file-updated-at">{file.updatedAt}</span>
                <button
                  type="button"
                  className="button-download-item"
                  onClick={this.handleClickDownloadButton}
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

  private handleClickDownloadButton = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const parent = targetElement.parentElement as HTMLElement;
    const filename = parent.children[1].innerHTML;
    const updatedAt = parent.children[2].innerHTML;
    console.log(filename, updatedAt);
    // TODO: implement downloadFille();
  };
  private handleClickDeleteButton = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const parent = targetElement.parentElement as HTMLElement;
    const filename = parent.children[1].innerHTML;
    const updatedAt = parent.children[2].innerHTML;
    console.log(filename, updatedAt);
    // TODO: implement deleteFile();
  };
}
