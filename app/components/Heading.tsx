type HeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ children, className = "" }: HeadingProps) => {
  return (
    <h1 className={`text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </h1>
  );
};
