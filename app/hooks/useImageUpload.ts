import { useState, useCallback, useEffect } from 'react';

type ImageUploadResult = {
  selectedImage: File | null;
  previewImageUrl: string | null;
  handleImageUpload: (file: File) => void;
  imageError: string | null;
}

export const useImageUpload = (): ImageUploadResult => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setImageError('Please upload an image file.');
      return;
    }

    setSelectedImage(file);
    setImageError(null);
  }, []);

  const previewImageUrl = selectedImage ? URL.createObjectURL(selectedImage) : null;

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  return { selectedImage, previewImageUrl, handleImageUpload, imageError };
};
