import { it, describe, test } from "./settings/it";
import expect from "expect";
import MockFileManager from "src/FileManager/MockFileManager";
import BaseFileManager from "src/FileManager/BaseFileManager";

import FileListComponent from "src/components/FileListComponent";
import {
  generateTestBlob,
  b64EncodeUnicode,
} from "src/test/browserTest/FileManager.browsertest";
import { render } from "@testing-library/react";
import * as React from "react";

describe("<FileListComponent /> with MockFileManager", () => {
  // let component;
  // let fileManager: MockFileManager;
  // let numberOfliTags: number;
  // beforeAll(async () => {

  // });
  test("check li tags were made perfectly", async () => {
    const fileManager: MockFileManager = new MockFileManager();
    const files: Blob[] = [];
    const numberOfliTags: number = Math.floor(Math.random() * 10 + 4);
    for (let i = 0; i < numberOfliTags; i++) {
      const file = await generateTestBlob(`${i}`);
      await fileManager.uploadFile(`${i}.txt`, file);
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
    function checkAllFileName() {
      const filenames: string[] = [];
    }
    expect(component.getAllByText(".txt")[0]).toBe(1);
  });
});
