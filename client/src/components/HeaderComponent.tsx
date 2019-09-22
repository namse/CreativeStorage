import * as React from "react";

export default class HeaderComponent extends React.Component {
  public uploadFileList!: FileList;

  public render() {
    return (
      <div>
        {/* upload버튼 누르면 할 동적 uploadfile.ts */}
        <form action="../share/uploadFile.ts" id="upload-form">
          <input
            type="file"
            id="upload-file"
            multiple
            onChange={this.handleUploadFileChange}
          ></input>
          <input type="submit" value="upload"></input>
        </form>
      </div>
    );
  }

  private handleUploadFileChange = () => {
    const inputElement: HTMLElement | null = document.querySelector(
      "#upload-file"
    );
    if (inputElement !== null) {
      const files: FileList | null = (inputElement as HTMLInputElement).files;
      if (files !== null) {
        const len = files.length;
        for (let i = 0; i < len; i++) {
          this.uploadFileList = files;
        }
        console.log(this.uploadFileList);
      }
    }
  };
}
