export type FileMetadata = {
  key: string;
  lastModified?: Date;
  eTag?: string;
  size?: number;
  storageClass?: string;
  owner?: {
    displayName?: string;
    id?: string;
  };
};

export type NoncurrentVersionTransition = {
  NoncurrentDays?: number;
  StorageClass?: string;
};

export type Transition = {
  Date?: Date;
  Days: number;
  StorageClass?: string;
};

export type Tag = {
  Key: string;
  Value: string;
};

export type LifecycleRuleFilter = {
  Prefix?: string;
  Tag?: Tag;
  And?: {
    Prefix?: string;
    /**
     * All of these tags must exist in the object's tag set in order for the rule to apply.
     */
    Tags?: Tag[];
  };
};

export type LifecycleExpiration = {
  Date?: Date;
  Days?: number;
  ExpiredObjectDeleteMarker?: boolean;
};

export type LifecycleRule = {
  Expiration?: LifecycleExpiration;
  ID?: string;
  Prefix?: string;
  Filter?: LifecycleRuleFilter;
  Status?: string;
  Transitions: Transition[];
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[];
  NoncurrentVersionExpiration?: {
    NoncurrentDays?: number;
  };
  AbortIncompleteMultipartUpload?: {
    DaysAfterInitiation?: number;
  };
};

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFile(files: File): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
  deleteFile(filename: string): Promise<void>;
  changeLifecycle(days: number): Promise<void>;
  getLifecycleConfiguration(): Promise<LifecycleRule>;
}
