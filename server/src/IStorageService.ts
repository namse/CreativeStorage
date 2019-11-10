export type preSignedPostData = {
  url: string;
  fields: {
    [index: string]: string;
  };
};

export type fileMetadata = {
  key?: string;
  lastModified?: Date;
  eTag?: string;
  size?: number;
  storageClass?: string;
  owner: {
    displayName?: string;
    id?: string;
  };
};

export interface NoncurrentVersionTransition {
  NoncurrentDays?: number;
  StorageClass?: string;
}

export interface Transition {
  Date?: Date;
  Days?: number;
  StorageClass?: string;
}

export interface Tag {
  Key: string;
  Value: string;
}

export interface LifecycleRuleFilter {
  Prefix?: string;
  Tag?: Tag;
  And?: {
    Prefix?: string;
    Tags?: Tag[];
  };
}

export interface LifecycleExpiration {
  Date?: Date;
  Days?: number;
  ExpiredObjectDeleteMarker?: boolean;
}

export interface LifecycleRule {
  Expiration?: LifecycleExpiration;
  ID?: string;
  Prefix?: string;
  Filter?: LifecycleRuleFilter;
  Status?: string;
  Transitions?: Transition[];
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[];
  NoncurrentVersionExpiration?: {
    NoncurrentDays?: number;
  };
  AbortIncompleteMultipartUpload?: {
    DaysAfterInitiation?: number;
  };
}

export default interface IStorageService {
  getUrlForDownloadFile(filename: string): string;
  getUrlForDeleteFile(filename: string): string;
  getPresginedPostDataForUpload(
    filename: string,
    contentType: string,
  ): preSignedPostData;
  getFileMetadataList(): Promise<fileMetadata[]>;
  putBucketLifecycleConfiguration(days: string): Promise<{}>;
  getBucketLifecycleConfiguration(): Promise<LifecycleRule | undefined>;
}
