import React, { useState } from 'react';

export default function ImageUploader () {
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const handleFileChange = (event) => {
      const files = event.target.files;
      setSelectedFiles([...selectedFiles, ...files]);
    };
  
    return (
        <div>
        <input type="file" multiple onChange={handleFileChange} />
        <div>
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Image ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
            />
          ))}
        </div>
      </div>
    );
  }