import React, { useState } from 'react';
import "../Css/Upload.css";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    // You can use the 'selectedFile' state to perform further actions
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your logic to upload the file, e.g., to a server or cloud storage
    } else {
      console.warn("No file selected for upload");
    }
  };

  return (
    <div className="upload">
      <h2>Image Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;
