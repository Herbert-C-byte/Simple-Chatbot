import { useState } from "react";

function App() {
  const [ischatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSend = () => {
    if (inputValue === "") {
      return;
    } else {
      setMessages([...messages, { role: "user", content: inputValue }]);
      setInputValue("");
    }
  };

  return (
    <>
      <main className="h-screen w-screen bg-[linear-gradient(to_right, rgba(247,247,247,1)_0%,rgba(240,240,250,0.2)_50%,rgba(247,247,247,1)_100%)] flex flex-col items-center justify-center">
        <div className=" bg-white p-2 flex flex-col items-center gap-2 max-w-3xl w-full">
          <div className="flex flex-col gap-2 bg-fuchsia-600">
            <h1 className="font-bold text-5xl ">Customer Support Chat</h1>
            <p className="text-lg font-normal">
              Click the chat button in the bottom right to start a conversation
              with our AI assistant
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-blue-600">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">✅ 24/7 Availability</li>
              <li className="flex items-center gap-2">✅ Instant Response</li>
              <li className="flex items-center gap-2">✅ Multi-language Support</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-amber-900">
            <p>
              This is a demo. Start chatting to see the widget in action. The AI
              will respond to your questions in real-time.
            </p>
          </div>
        </div>
      </main>
      {/* Chat Widget */}
      {!ischatOpen && (
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-6 rounded-full shadow-lg hover:bg-blue-700 z-10 transition-colors hover:animate-pulse "
          onClick={() => setIsChatOpen(true)}
        >
          Chat
        </button>
      )}
      {ischatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b bg-blue-400 flex items-center justify-between relative">
            <h3 className="font-bold text-lg">Customer Support</h3>
            <button
              className="absolute right-2 rounded-xs bg-blue-600 text-black hover:text-gray-800"
              onClick={() => setIsChatOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-blue-200">
            {!messages.length && (
              <p>
                Welcome to our customer support chat! How can we assist you
                today?
              </p>
            )}
            {messages.map((messages, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded ${messages.role === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-300 text-gray-800 self-start"}`}
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
      )}
    </>
  );
}

export default App;
