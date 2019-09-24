import { it, describe, test } from "./settings/it";
import expect from "expect";
import MockFileManager from "src/FileManager/MockFileManager";
import BaseFileManager from "src/FileManager/BaseFileManager";
import FileListComponent from "src/components/FileListComponent";
import {
  generateTestBlob,
  b64EncodeUnicode,
} from "src/test/browserTest/FileManager.browsertest";
const render: any =
  typeof document !== "undefined"
    ? // tslint:disable-next-line:no-var-requires
      require("@testing-library/react").render
    : undefined;
// import { render } from "@testing-library/react";
import * as React from "react";

describe("<FileListComponent /> with MockFileManager", () => {
  test("check li tags were made perfectly", async () => {
    const fileManager: MockFileManager = new MockFileManager();
    const files: Blob[] = [];
    const numberOfliTags: number = Math.floor(Math.random() * 10 + 4);
    const filenames: string[] = [];
    for (let i = 0; i < numberOfliTags; i++) {
      const file = await generateTestBlob(`${i}`);
      await fileManager.uploadFile(`${i}.txt`, file);
      filenames[i] = `${i}.txt`;
    }

    const component = render(<FileListComponent fileManager={fileManager} />);
    const timer = await new Promise((resolve, reject) => {
      setTimeout(() => resolve("done"), 2000);
    });
    // test 1. number of li should be same the number I uploaded
    expect(component.getAllByRole(FileListComponent.listItemRole).length).toBe(
      numberOfliTags,
    );

    // test 2. test li show right filename comparing what I upload
    const isAllFileNameInComponent = filenames.every((filename) => {
      if (component.getAllByText(filename).length === 1) {
        return true;
      } else {
        return false;
      }
    });
    expect(isAllFileNameInComponent).toEqual(true);
  });
});
