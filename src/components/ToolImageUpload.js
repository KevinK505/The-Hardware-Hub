// src/components/ToolImageUpload.js
import React, { useState } from 'react';

function ToolImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image first.');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'unsigned_preset'); // your Cloudinary unsigned preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dca2v1vff/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.secure_url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed.');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Upload Tool Image</h3>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <strong>Uploaded Image:</strong><br />
          <img src={imageUrl} alt="Tool" style={{ maxWidth: '300px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
}

export default ToolImageUpload;
