import * as React from "react";
import fsExtra from "fs-extra";
import fs from "fs";
import formData from "form-data";

const App = () => {
  const downloadFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): string => {
    console.log("a");
    const ret: string = "OK";
    return ret;
  };
  return (
    <div>
      <button onClick={downloadFile}>download</button>
    </div>
  );
};

export default App;
