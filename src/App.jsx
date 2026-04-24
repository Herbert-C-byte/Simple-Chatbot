import { useState } from "react";
import ChatWidget from "./components/chat-widget";

function App() {
  const [ischatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setIsChatOpen(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputValue },
    ];

    setMessages(updatedMessages);
    setInputValue("");

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://simple-chatbot-server-production.up.railway.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        }
      );

      const data = await response.json();

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.log("erro ao chamar api", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Atendimento Inteligente com IA
          </h1>

          <p className="text-lg text-muted-foreground">
            Automatiza o suporte ao cliente com um chatbot integrado ao teu site.
            Respostas instantâneas, disponíveis 24/7, com uma experiência fluida
            semelhante ao WhatsApp.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-xl bg-card">
              ⚡ Respostas em tempo real
            </div>
            <div className="p-4 border rounded-xl bg-card">
              🌍 Suporte multi-idioma
            </div>
            <div className="p-4 border rounded-xl bg-card">
              🤖 Automatização inteligente
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            👉 Abre o chat no canto inferior direito e testa a experiência.
          </p>
        </div>
      </main>

      {/* Botão estilo WhatsApp */}
      {!ischatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl flex items-center justify-center text-xl transition"
        >
          💬
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