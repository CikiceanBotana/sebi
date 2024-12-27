// src/components/contact/contact-form.tsx
'use client';

import React, { useState } from 'react';
import { Send, Mail, MessageCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success'); // For now, just show success. You can implement actual form submission later
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-lacquer text-5xl text-[#FAFAFA] mb-4">
            Contactează-ne
          </h1>
          <p className="font-montserrat text-[#FAFAFA]/80 text-lg">
            Ai întrebări sau sugestii? Suntem aici să te ajutăm.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="relative">
          {/* Background with gradient effect */}
          <div 
            className="absolute -inset-1 rounded-lg z-0"
            style={{
              background: '#2D1A4A',
              border: '1px solid rgba(250,250,250,0.1)',
            }}
          >
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{
                background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
              }}
            />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="relative z-10 p-8 space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-[#FAFAFA] font-montserrat mb-2">
                  Nume
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#17012C] border border-[#FAFAFA]/10 rounded-lg px-4 py-3 text-[#FAFAFA] 
                             placeholder-[#FAFAFA]/50 font-montserrat focus:outline-none focus:border-[#047A6E]
                             transition-colors duration-200"
                    placeholder="Numele tău complet"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-[#FAFAFA] font-montserrat mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#17012C] border border-[#FAFAFA]/10 rounded-lg px-4 py-3 text-[#FAFAFA] 
                             placeholder-[#FAFAFA]/50 font-montserrat focus:outline-none focus:border-[#047A6E]
                             transition-colors duration-200"
                    placeholder="adresa@email.com"
                  />
                </div>
              </div>

              {/* Phone Input (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-[#FAFAFA] font-montserrat mb-2">
                  Telefon <span className="text-[#FAFAFA]/50 text-sm">(opțional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#17012C] border border-[#FAFAFA]/10 rounded-lg px-4 py-3 text-[#FAFAFA] 
                             placeholder-[#FAFAFA]/50 font-montserrat focus:outline-none focus:border-[#047A6E]
                             transition-colors duration-200"
                    placeholder="Numărul tău de telefon"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-[#FAFAFA] font-montserrat mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#17012C] border border-[#FAFAFA]/10 rounded-lg px-4 py-3 text-[#FAFAFA] 
                           placeholder-[#FAFAFA]/50 font-montserrat focus:outline-none focus:border-[#047A6E]
                           transition-colors duration-200 resize-none"
                  placeholder="Scrie-ne mesajul tău aici..."
                />
              </div>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 font-montserrat">
                <MessageCircle size={20} />
                <span>Mesajul tău a fost trimis cu succes!</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 font-montserrat">
                <AlertCircle size={20} />
                <span>A apărut o eroare. Te rugăm să încerci din nou.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#9F1E07] text-[#FAFAFA] py-4 px-6 rounded-lg font-faculty
                       hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-all duration-300
                       flex items-center justify-center gap-2 group"
            >
              <span>Trimite Mesajul</span>
              <Send className="w-5 h-5 group-hover:stroke-[url(#button-gradient)]" />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="button-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#047A6E" />
                    <stop offset="50%" stopColor="#047A6E" />
                    <stop offset="100%" stopColor="#9F1E07" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-[#FAFAFA]/80 font-montserrat mb-4">
            Alternativ, ne poți contacta direct la:
          </p>
          <a 
            href="mailto:contact@example.com" 
            className="inline-flex items-center gap-2 text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-200 font-montserrat"
          >
            <Mail size={20} />
            contact@example.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;