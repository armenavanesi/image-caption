"use client";

import { useState } from "react";
import { useImageUpload } from "./hooks/useImageUpload";
import DarkModeToggle from "./components/DarkModeToggle";
import { ImageUpload } from "./components/ImageUpload";
import { Caption } from "./components/Caption";
import { MainLayout } from "./components/MainLayout";
import { Heading } from "./components/Heading";
import { Button } from "./components/Button";

export default function Home() {
  const { selectedImage, previewImageUrl, handleImageUpload, imageError } = useImageUpload();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch('/api/generateCaption', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate caption');
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      console.error("Error generating caption:", error);
      setCaption("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout darkMode={darkMode}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={() => setDarkMode(!darkMode)} />
      <Heading>Image Caption Generator</Heading>
      <main className="flex flex-col items-center gap-8 p-8 rounded-lg shadow-lg w-full max-w-md transition-colors bg-white dark:bg-gray-800">
        <ImageUpload 
          previewImageUrl={previewImageUrl}
          handleImageUpload={handleImageUpload}
          imageError={imageError}
        />
        <Button
          onClick={handleGenerateCaption}
          disabled={!selectedImage || loading}
          loading={loading}
          defaultText="Generate Caption"
          loadingText="Generating..."
        />
        <Caption caption={caption} />
      </main>
    </MainLayout>
  );
}
