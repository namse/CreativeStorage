import * as React from "react";
interface Props {
  disabled: boolean;
  onFilesAdded(array: Array<File | null>): void;
}

class FileBrowserButton extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.onFilesAdded = this.onFilesAdded.bind(this);
  }

  public onFilesAdded(event: React.ChangeEvent<HTMLInputElement>) {
    if (!this.props.disabled) {
      const files = event.target.files;
      const array: Array<File | null> = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  public render() {
    return (
      <input
        className="FileInput"
        type="file"
        multiple
        onChange={this.onFilesAdded}
        value="openFileBrowser"
      />
    );
  }

  private fileListToArray(files: FileList | null) {
    const array = [];
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        array.push(files.item(i));
      }
    }
    return array;
  }
}

export default FileBrowserButton;
