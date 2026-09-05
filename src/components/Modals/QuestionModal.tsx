import React, { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import type { Product } from "../../data/mockData";

interface QuestionModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ product, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-gray-900 max-h-[90vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-1">
          Ask a Question
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Inquiry regarding: <strong className="text-gray-700">{product.name}</strong> ({product.model})
        </p>

        {submitted ? (
          <div className="py-8 text-center text-green-600 space-y-2">
            <CheckCircle2 className="w-12 h-12 mx-auto" />
            <p className="font-semibold text-sm">Your question has been sent successfully!</p>
            <p className="text-xs text-gray-500">We will get back to you shortly via email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. John Doe"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#218596]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.com"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#218596]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Question / Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide custom specifications or order inquiries..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#218596]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#218596] hover:bg-[#174c57] text-white font-semibold text-xs uppercase tracking-wider py-2.5 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Question</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
