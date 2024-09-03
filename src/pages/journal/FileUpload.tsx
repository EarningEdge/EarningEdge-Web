import React, { useState } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

interface FileUploadProps {
  onFileChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      onFileChange([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  return (
    <div className="mb-4">
      <h1 className="font-medium text-gray-200 mb-1">Upload files</h1>
      <label className="block bg-darkSecondary border-dashed border-2 border-darkStroke rounded-md p-6 text-center cursor-pointer">
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />
        <div className="flex flex-col items-center">
          <UploadOutlined className="text-blue-500 text-2xl" />
          <p className="text-gray-500">Click to upload</p>
          <small className="text-gray-400">JPEG PNG JPG &lt; 5 MB</small>
        </div>
      </label>
      {files.length > 0 && (
        <div className="mt-4">
          <h2 className="text-gray-200 mb-2">Selected Files:</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-darkSecondary border border-darkStroke rounded-md p-2">
                <span className="text-gray-200 truncate">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <DeleteOutlined />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;