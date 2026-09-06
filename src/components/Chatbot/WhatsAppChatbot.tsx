import React, { useState } from "react";
import { Send, X, CheckCheck } from "lucide-react";

export const WhatsAppChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasOpened, setHasOpened] = useState(false);

  const WHATSAPP_PHONE = "923494846107";

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setHasOpened(true);
  };

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || message;
    if (!finalMsg.trim()) return;

    const encoded = encodeURIComponent(finalMsg.trim());
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank");
    setMessage("");
  };

  const quickPrompts = [
    "Request a price quote",
    "View catalog & surgical sets",
    "Custom instruments inquiry",
    "Shipping & delivery info",
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 font-roboto">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2 w-[calc(100vw-32px)] sm:w-[350px] max-w-[350px] max-h-[calc(100vh-90px)] sm:max-h-[460px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all transform animate-in fade-in duration-200">
          {/* Header */}
          <div className="bg-[#218596] p-3 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#218596] font-bold text-sm shadow-inner">
                  {/* Medical Cross Logo */}
                  <svg
                    className="w-5 h-5 text-[#218596]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-xs tracking-wide text-white flex items-center gap-1">
                  Coin Surgical Support
                </h4>
                <p className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span>Online</span> • <span>Fast reply</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-3 bg-[#f4f7f8] flex-1 overflow-y-auto space-y-2.5 min-h-0">
            {/* Timestamp */}
            <div className="text-center">
              <span className="text-[9px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-2xs">
                Today
              </span>
            </div>

            {/* Welcome Message */}
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="bg-white p-2.5 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm text-xs text-gray-800 space-y-1 leading-snug">
                <p className="font-semibold text-[#218596] text-[10px]">
                  Coin Surgical Assistant
                </p>
                <p>
                  Hi! 👋 Welcome to <strong>Coin Surgical</strong>. How can we help you today?
                </p>
                <div className="flex items-center justify-end gap-1 text-[9px] text-gray-400 pt-0.5">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-[#218596]" />
                </div>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="pt-1">
              <p className="text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Quick Inquiries:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs bg-white hover:bg-[#eef8fa] hover:text-[#218596] hover:border-[#218596] border border-gray-200 text-gray-700 py-1.5 px-2.5 rounded-lg transition-all cursor-pointer shadow-2xs flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <span className="text-[#218596] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input Footer */}
          <div className="p-2.5 bg-white border-t border-gray-100 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message on WhatsApp..."
                className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#218596] focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  message.trim()
                    ? "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                title="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[9px] text-center text-gray-400 mt-1.5">
              Direct chat with Official Support
            </p>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="relative flex items-center justify-end">
        {!isOpen && !hasOpened && (
          <div className="absolute right-16 bg-white text-gray-800 text-xs py-1.5 px-3 rounded-full shadow-lg border border-gray-100 whitespace-nowrap animate-bounce font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>Chat with us</span>
          </div>
        )}

        <button
          onClick={handleOpen}
          className="relative group bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer"
          aria-label="WhatsApp Chat"
        >
          {/* Notification Dot */}
          {!hasOpened && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              1
            </span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <svg
              className="w-7 h-7 fill-current text-white"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
