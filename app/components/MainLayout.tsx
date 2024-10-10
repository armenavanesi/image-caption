type MainLayoutProps = {
  darkMode: boolean;
  children: React.ReactNode;
}

export const MainLayout = ({ darkMode, children }: MainLayoutProps) => {
  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
};
