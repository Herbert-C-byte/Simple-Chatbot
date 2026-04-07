import { useState } from 'react'

function App() {
  const [ischatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <>
      <main className="h-screen w-screen bg-red-700 flex flex-col items-center justify-center">
        <div className=" bg-white size-4 p-2 flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 m-6 bg-fuchsia-600">
            <h1 className="font-bold text-5xl ">Customer Support Chat</h1>
            <p className="text-lg font-normal">Click the chat button in the bottom right to start a conversation with our AI assistant</p>
          </div>
          <div className="flex flex-col gap-2 m-6 bg-blue-600">
            <h2 className="text-xl font-semibold h-1.5">Features</h2>
            <ul>
              <span>c</span><li>24/7 Availability</li>
              <span>c</span><li>Instant Response</li>
              <span>c</span><li>Multi-language Support</li>
            </ul>
          </div>
          <div className="pt-8 pb-8 rounded-xl bg-amber-900">
            <p>
              This is a demo. Start chatting to see the widget in action. The AI will respond to your questions in real-time.
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
            <button className='absolute top-2 right-2 text-gray-600 hover:text-gray-800' onClick={() => setIsChatOpen(false)}>
              Close
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-blue-200">
            <p>Welcome to our customer support chat! How can we assist you today?</p>
          </div>
          <div className="p-4 border-t bg-blue-600">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default App