"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState<string>('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!validFileTypes.find(type => type === file.type)) {
        return;
      }

      console.log(file)

      const imageForm = new FormData();
      imageForm.append('image', file);

      console.log(imageForm.get('image'))

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/images/1`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageForm
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setUploadStatus(`Upload successful: ${data.fileUrl}`);
        } else {
          setUploadStatus('Upload failed');
          console.error('Error uploading file:', response.status);
        }
      } catch (error) {
        setUploadStatus('Upload failed');
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <input id="imageInput" type="file" hidden onChange={handleFileChange} className="w-full "/>
      <label htmlFor="imageInput" className="btn btn-outline btn-blue mb-4">
        <Button disabled className='cursor-pointer'> Upload </Button>
      </label>
    </div>
  );
};

export default FileUpload;