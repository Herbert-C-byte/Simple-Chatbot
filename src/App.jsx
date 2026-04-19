import { useState } from "react";
import ChatWidget from "./components/chat-widget";

function App() {
  const [ischatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setIsChatOpen(false);
  };
  const handleSend = async () => {
    if (inputValue === "") {
      return;
    } else {
      const updatedMessages = [
        ...messages,
        { role: "user", content: inputValue },
      ];
      setMessages(updatedMessages);
      setInputValue("");

      try {
        setIsLoading(true);
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system:
              "You are a helpful customer support assistant. Be concise and friendly.",
            messages: updatedMessages,
          }),
        });

        const data = await response.json();
        const assistantMessage = data.content[0].text;

        setMessages([
          ...updatedMessages,
          { role: "assistant", content: assistantMessage },
        ]);
      } catch (error) {
        console.log("erro ao chamar api", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-background to-secondary/20 to-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className=" bg-white p-2 flex flex-col items-center gap-2 max-w-2xl w-full text-center space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-foreground">
              Customer Support Chat
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Click the chat button in the bottom right to start a conversation
              with our AI assistant
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl sm:p-8 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
              Features
            </h2>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-3">✅ 24/7 Availability</li>
              <li className="flex items-start gap-3">✅ Instant Response</li>
              <li className="flex items-start gap-3">
                ✅ Multi-language Support
              </li>
            </ul>
          </div>
          <div className="bg-secondary/50 rounded-xl p-6 sm:p-8 border border-border">
            <p className="text-xs sm:text-sm text-secondary-foreground">
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
        <ChatWidget
          inputValue={inputValue}
          setInputValue={setInputValue}
          messages={messages}
          handleSend={handleSend}
          handleClose={handleClose}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default App;
