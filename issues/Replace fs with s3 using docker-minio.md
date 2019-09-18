
- Provide docker guide for minio setting
  - Command for install minio docker image
  - Command for start minio docker image
- In StorageService, replace fs with s3.
    - Use aws-sdk's s3
    - https://github.com/minio/cookbook/blob/master/docs/aws-sdk-for-javascript-with-minio.md
- Run test code which we made before. ***Don't create new test code for this issue***.