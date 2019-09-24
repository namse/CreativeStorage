import * as React from "react";
import FileBrowserButton from "../FileBrowserButton/FileBrowserButton";
import { copy } from "fs-extra";
import { render } from "react-dom";

interface State {
  files: File[];
  uploading: boolean;
  uploadProgress: object;
  successfullUploaded: boolean;
}
class Upload extends React.Component<State> {
public state = {
    files: [],
    uploading: false,
    uploadState: {},
    successfullUploaded: false    //여기 콤마를 왜찍으라는건지?
};

  public onFilesAdded(files: File[]) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  async public uploadFiles(): Promise<T> {
    this.setState({ uploadProgress: {}});
    const promises: Promise<any> = [];
    this.state.files.forEach((file: File) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
      this.setState({successfullUploaded: true, uploading: false});
    } catch(e) {
      this.setState({successfullUploaded: true, uploading: false});
    }
  }

public sendRequest(file: File){
  const fileParts: string = file.name.split(".");
  const fileName: string = fileParts[0];
  const fileType: string = fileParts[1];

  fetch("testurl",{
    method: "POST",
    body: {fileName: fileName:, fileType: fileType}
  }).then((response: { body: { signedUrl: string; }; })=>{
    const signedUrl = response.body.signedUrl;
    const formData = new FormData();
    formData.append("file", file, fileName);
    fetch(`${signedUrl}`, {
      method: "POST",
      body: formData,
      headers: { "content-type" : "fileType"}
      const copy={...this.state.uploadState};
      copy[file.name]={uploading: true, uploadSuccess: false, uploadFail: false}
      this.setState({uploadState: copy})
    }).then(response => {
      const copy = {...this.state.uploadState};
      copy[file.name] = {uploading : false, uploadSuccess : true, uploadFail: false}
    }).catch(err=>{
      const copy = {...this.state.uploadState};
      copy[file.name] = {uploading: false, uploadSuccess: false, uploadFail: true}
      this.setState({uploadState:copy});
    });
  });
}

public renderUploadState(file){
  const uploadState = this.state.uploadState[file.name];
  return (
  <div className="uploadStateWrapper">
    <img className="uploadingIcon"
    alt="uploading"
    src="loadingIcon.gif"
    style={{
      opacity: uploadState.uploading === true ? 1 : 0 //trailcomma error
    }}
   />
   <img className="successIcon"
    alt="uploadSuccess"
    src="successgIcon.gif"
    style={{
      opacity: uploadState.uploadSuccess === true ? 1 : 0 //trailcomma error
    }}
   />
   <img className="failIcon"
    alt="uploadFail"
    src="failIcon.gif"
    style={{
      opacity: uploadState.uploadFail === true ? 1 : 0 //trailcomma error
    }}
   />
   </div>
)
}

renderActions(){
  if(this.state.successfullUploaded){
    return(
      <button
      onClick = {
        () => this.setState({files: [], successfullUploaded: false})
      }
      >
      Clear
      </button>
    )
    }else{
      return(
      <button
      disabled={this.state.files.length < 0 || this.state.uploading}
      onClick={this.uploadFiles}
      >
        Upload
      </button>
       );
       }
  }


public render(){
  return(
    <div className="Upload">
    <span className="Title">Upload Files</span>
    <div className = "content">
    <div>
    <FileBrowserButton
    onFilesAdded={this.onFilesAdded}
    disabled={this.state.uploading || this.state.successfullUploaded}
    />
    </div>
    <div className="Files">
      {this.state.files.map(file=>{
        return(
          <div key={file.name} className="Row">
          <span className="Filename">{file.name}</span>
          {this.renderUploadState(file)}
          </div>
        )
      })}
    </div>
    </div>
    <div className="Actions">{this.renderActions()}</div>
    </div>
  )
}

}
