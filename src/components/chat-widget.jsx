import { useRef, useEffect } from "react";

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
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      
      {/* HEADER */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h3 className="font-semibold text-sm">Assistente</h3>
            <p className="text-xs opacity-80">
              {isLoading ? "A escrever..." : "Online"}
            </p>
          </div>
        </div>

        <button onClick={handleClose} className="text-sm opacity-80 hover:opacity-100">
          ✕
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 bg-[#ece5dd] p-4 overflow-y-auto space-y-3">
        {!messages.length && (
          <p className="text-center text-sm text-gray-500 mt-10">
            👋 Olá! Como posso ajudar?
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none shadow"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl text-sm shadow">
              ...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 bg-gray-100 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escreve uma mensagem..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-full border outline-none text-sm"
        />

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm"
        >
          ➤
        </button>
      </div>
    </div>
  );
}