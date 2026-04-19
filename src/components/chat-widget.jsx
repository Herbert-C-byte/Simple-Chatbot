export default function ChatWidget({
  messages,
  inputValue,
  setInputValue,
  handleSend,
  handleClose,
  isLoading,
}) {
  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b bg-blue-400 flex items-center justify-between relative">
        <h3 className="font-bold text-lg">Customer Support</h3>
        <button
          className="absolute right-2 rounded-xs bg-blue-600 text-black hover:text-gray-800"
          onClick={() => handleClose()}
        >
          Close
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-blue-200">
        {!messages.length && (
          <p>
            Welcome to our customer support chat! How can we assist you today?
          </p>
        )}
        {messages.map((messages, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded max-w-[75%] ${
              messages.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-300 text-gray-800 mr-auto"
            }`}
          >
            {messages.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-blue-600 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
