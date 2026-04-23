import { useRef, useEffect, use } from "react";

export default function ChatWidget({
  messages,
  inputValue,
  setInputValue,
  handleSend,
  handleClose,
  isLoading,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-full max-w-sm h-150 sm:h-125 rounded-2xl shadow-2xl bg-card flex flex-col z-40 border border-border animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 sm:p-5 border-b bg-primary text-primary-foreground flex items-center justify-between relative rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full"></div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Support</h3>
            <p className="text-xs opacity-90">Always here to help</p>
          </div>
        </div>
        <button
          className="absolute right-2 rounded-xs bg-blue-600 text-black hover:text-gray-800"
          onClick={() => handleClose()}
        >
          Close
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto sm:p-5 space-y-3 sm:space-y-4 bg-background">
        {!messages.length && (
          <div className="flex items-center justify-center h-full text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto"></div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Hi! 👋 How can we help?
              </p>
            </div>
          </div>
        )}
        {messages.map((messages, index) => (
          <div
            key={index}
            className={`flex ${
              messages.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm sm:text-base leading-relaxed ${
                messages.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              }`}
            >
              {messages.content}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-blue-600 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
