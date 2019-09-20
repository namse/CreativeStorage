
<functions>
- Declare interface IFileManager
  - Methods
    - DownloadFile(filename: string)
    - UploadFile(file: File, filename: string)
    - ListFiles()

- Implement MockFileManager
  - Class MockFileManager implements IFileManager
  - Use fake data here.

- Implmeent FileManager
  - Class FileManager implements IFileManager
  - Use fetch api, communicate with server

<pages>
Create download file page
  - List up files
  - Download when click button
  - Create 2 test codes, for MockFileManager and FileManager.
Create upload file page
  - Upload file
  - Create 2 test codes, for MockFileManager and FileManager.

