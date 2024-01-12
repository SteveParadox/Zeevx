import React, { useRef } from 'react';
import {storage} from "../Auth/firebase"

const storageRef = storage.ref();


function Storage() {
  const fileInputRef = useRef(null);

  function uploadFile() {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (file) {
      const uploadTask = storageRef.child(`images/${file.name}`).put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading file:', error);
        },
        () => {
          // Handle successful uploads on complete
          console.log('File uploaded successfully!');
        }
      );
    }
  }

}

export default Storage;
