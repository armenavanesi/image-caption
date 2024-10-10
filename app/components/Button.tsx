type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  defaultText: string;
  loadingText?: string;
  className?: string;
}

export const Button = ({
  onClick,
  disabled = false,
  loading = false,
  defaultText,
  loadingText = "Loading...",
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full px-6 py-2 rounded-lg transition-colors disabled:opacity-50 bg-zinc-950 text-white hover:bg-zinc-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 ${className}`}
    >
      {loading ? loadingText : defaultText}
    </button>
  );
};
