type CaptionProps = {
  caption: string;
}

export const Caption = ({ caption }: CaptionProps) => {
  return (
    <div className="w-full min-h-[4rem] flex items-center justify-center p-4 rounded-lg transition-colors bg-gray-100 dark:bg-gray-700">
      {caption && (
        <p className="text-center text-lg text-gray-800 dark:text-gray-200">
          That is a picture of {caption}
        </p>
      )}
    </div>
  );
};
