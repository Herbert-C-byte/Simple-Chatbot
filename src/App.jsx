import { useState } from "react";
import ChatWidget from "./components/chat-widget";

function App() {
  const [ischatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* HERO */}
      <section className="px-5 pt-10 pb-6 text-center space-y-4">
        <h1 className="text-3xl font-bold leading-tight">
          Chatbots com IA para o teu negócio
        </h1>

        <p className="text-sm text-muted-foreground">
          Automatiza atendimento, responde clientes instantaneamente e aumenta conversões.
        </p>

        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-full text-sm shadow"
        >
          Testar Agora
        </button>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="px-5 py-6 space-y-4">
        <h2 className="text-lg font-semibold">O problema</h2>
        <p className="text-sm text-muted-foreground">
          Clientes esperam respostas rápidas. Equipas humanas não conseguem responder 24/7.
        </p>

        <h2 className="text-lg font-semibold">A solução</h2>
        <p className="text-sm text-muted-foreground">
          Um chatbot inteligente integrado ao teu site que responde automaticamente em tempo real.
        </p>
      </section>

      {/* FEATURES */}
      <section className="px-5 py-6 grid grid-cols-1 gap-3">
        <div className="p-4 rounded-xl bg-card border text-sm">
          ⚡ Respostas instantâneas
        </div>
        <div className="p-4 rounded-xl bg-card border text-sm">
          🤖 IA treinada para suporte
        </div>
        <div className="p-4 rounded-xl bg-card border text-sm">
          📱 Experiência estilo WhatsApp
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="px-5 py-10 text-center space-y-4">
        <h2 className="text-lg font-semibold">Demonstração ao vivo</h2>
        <p className="text-sm text-muted-foreground">
          Abre o chat e experimenta falar com o assistente.
        </p>
      </section>

      {/* FLOATING BUTTON */}
      {!ischatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-5 right-5 w-14 h-14 bg-green-500 rounded-full text-white text-xl shadow-lg"
        >
          💬
        </button>
      )}

      {/* CHAT */}
      {ischatOpen && (
        <ChatWidget
          inputValue={inputValue}
          setInputValue={setInputValue}
          messages={messages}
          handleSend={handleSend}
          handleClose={() => setIsChatOpen(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;