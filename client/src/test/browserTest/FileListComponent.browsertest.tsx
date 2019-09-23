import { it, describe, test } from "./settings/it";
import expect from "expect";
import MockFileManager from "src/FileManager/MockFileManager";
import FileListComponent from "src/components/FileListComponent";
import { render } from "@testing-library/react";
import * as React from "react";

describe("<FileListComponent />", () => {
  test("check li tags were made perfectly", async () => {
    const fileManager = new MockFileManager();
    fileManager.
    await fileManager.uploadFile();
    await fileManager.uploadFile();
    await fileManager.uploadFile();
    await fileManager.uploadFile();

    const component = render(<FileListComponent fileManager={fileManager} />);

    // test 1. number of li should be same the number I uploaded

    // test 2. test li show right filename comparing what I upload

    expect(
      component.getAllByRole(FileListComponent.listItemRole).length,
    ).not.toEqual(0);
  });
});
