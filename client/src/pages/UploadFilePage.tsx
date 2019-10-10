import * as React from "react";
import S3FileManager from "src/FileManager/S3FileManager";
import UploadFileComponent from "src/components/UploadFileComponent";
import "src/stylesheets/UploadFilePage.css";

export default class UploadFilePage extends React.Component {
  public render() {
    return (
      <div >
        <div className="uploadWrapper">
        <UploadFileComponent
          fileManager={new S3FileManager()}
        ></UploadFileComponent>
        </div>
      </div>
    );
  }
}
