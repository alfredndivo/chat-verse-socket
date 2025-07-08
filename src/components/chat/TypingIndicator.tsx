
interface TypingIndicatorProps {
  users: string[];
}

export const TypingIndicator = ({ users }: TypingIndicatorProps) => {
  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-3 px-2">
      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-xs">💬</span>
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {users.length === 1 
                ? `${users[0]} is typing`
                : `${users.join(", ")} are typing`
              }
            </span>
            <div className="flex gap-1 ml-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
