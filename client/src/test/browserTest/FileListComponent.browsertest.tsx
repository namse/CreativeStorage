import { it, describe, test } from "./settings/it";
import expect from "expect";
import MockFileManager from "src/FileManager/MockFileManager";
import FileListComponent from "src/components/FileListComponent";
import {
  generateTestBlob,
  b64EncodeUnicode,
} from "src/test/browserTest/FileManager.browsertest";
import { render } from "@testing-library/react";
import * as React from "react";

describe("<FileListComponent /> with MockFileManager", () => {
  test("check li tags were made perfectly", async () => {
    const fileManager = new MockFileManager();
    const files: Blob[] = [];
    const numberOfliTags: number = Math.floor(Math.random() * 10 + 4);
    for (let i = 0; i < numberOfliTags; i++) {
      const file = await generateTestBlob();
      files.push();
    }

    const component = render(<FileListComponent fileManager={fileManager} />);

    // test 1. number of li should be same the number I uploaded
    expect(component.getAllByRole(FileListComponent.listItemRole).length).toBe(
      numberOfliTags,
    );

    // test 2. test li show right filename comparing what I upload
    // expect(component.getAllByText());
  });
});
