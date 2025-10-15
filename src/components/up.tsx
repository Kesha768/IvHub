// src/pages/upload.tsx

import React from 'react';
import FileUpload from '../components/FileUpload';

const UploadPage: React.FC = () => {
  const handleFilesUploaded = (files: File[]) => {
    // Handle uploaded files here
    console.log(files);
  };

  return (
    <div>
      <h1>Multiple File Upload</h1>
      <FileUpload onFilesUploaded={handleFilesUploaded} />
    </div>
  );
};

export default UploadPage;