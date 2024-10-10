import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploadProps = {
  previewImageUrl: string | null;
  handleImageUpload: (file: File) => void;
  imageError: string | null;
}

export const ImageUpload = ({ previewImageUrl, handleImageUpload, imageError }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      handleImageUpload(file);
    } else {
      console.error("File size exceeds 5MB.");
    }
  };

  return (
    <div
      className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500' : 'border-gray-300 hover:border-zinc-500'} dark:border-gray-600 dark:hover:border-gray-400`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewImageUrl ? (
        <div className="relative w-full h-full">
          <Image src={previewImageUrl} alt="Selected image" layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
      ) : (
        <>
          <UploadCloud className="w-12 h-12 mb-2 text-gray-400 dark:text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isDragging ? "Drop the image here" : "Drag and drop an image here, or click to select"}
          </p>
        </>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && file.size <= 5 * 1024 * 1024) {
            handleImageUpload(file);
          } else {
            console.error("File size exceeds 5MB.");
          }
        }}
        className="hidden"
        ref={fileInputRef}
      />

      {imageError && <p className="text-red-500">{imageError}</p>}
    </div>
  );
};
