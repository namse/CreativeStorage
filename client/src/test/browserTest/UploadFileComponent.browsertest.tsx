import { describe, test } from "src/test/browserTest/settings/it";
import expect from "expect";
import MockFileManager from "src/FileManager/MockFileManager";
import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadFileComponent from "src/components/UploadFileComponent";
import { generateTestBlob } from "src/test/browserTest/FileManager.browsertest";

describe("<UploadFileComponent/> with MockFileManager", () => {
  test("check whether number of fileschosen are same with number of list", async () => {
    const fileManager: MockFileManager = new MockFileManager();
    const blob = await generateTestBlob();
    const files: File[] = [];
    for (let i = 0; i < 10; i++) {
      files.push(new File([blob], `file${i}.mp4`, { type: "video/mp4" }));
    }
    const component = render(<UploadFileComponent fileManager={fileManager} />);
    const fileInput = component.getByRole("file-input");

    fireEvent.change(fileInput, {
      target: { files: [files[0], files[1], files[2], files[3], files[4]] },
    });
    let liTags = component.getAllByRole("file-name");
    // check liTag added properly
    expect(liTags.length).toBe(5);

    fireEvent.change(fileInput, {
      target: { files: [files[5], files[6], files[7], files[8], files[9]] },
    });
    liTags = component.getAllByRole("file-name");
    // check liTag added properly when liTag already exists
    expect(liTags.length).toBe(10);

    const isFilenameExists = files.every((file) => {
      if (component.getAllByText(file.name).length === 1) {
        return true;
      } else {
        return false;
      }
    });

    // check liTags have proper filename or not
    expect(isFilenameExists).toBe(true);

    const sendFileButton = component.getByRole("send-file");
    fireEvent.click(sendFileButton);

    const fileMetadataList = await fileManager.getFileMetadataList();
    expect(fileMetadataList.length).toBe(10);
  });
});

// check if Filelist is same with MockFileRepository after send
