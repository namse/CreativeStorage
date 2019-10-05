import * as React from "react";
import S3FileManager from "src/FileManager/MockFileManager";
import UploadFileComponent from "src/components/UploadFileComponent";

export default class UploadFilePage extends React.Component {
  public render() {
    return (
      <div>
        <UploadFileComponent
          fileManager={new S3FileManager()}
        ></UploadFileComponent>
      </div>
    );
  }
}
