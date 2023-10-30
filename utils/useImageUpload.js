import { useState } from 'react';
import axios from 'axios';
import { ERRORS } from 'constants/errors';

export const useImageUpload = (userId) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const maxFileSize = 1 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setErrorMessage(ERRORS.FILE_TOO_LARGE.MESSAGE);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/v1/image/uploadFile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.file) {
        const imageUrl = response.data.file.url;
        setUploadedImage(imageUrl);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || '업로드에 실패했습니다.',
      );
    }
  };

  return { uploadedImage, handleImageUpload, errorMessage };
};
