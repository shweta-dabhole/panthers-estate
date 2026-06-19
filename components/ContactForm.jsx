"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full bg-white" style={{ padding: '80px 40px', boxSizing: 'border-box', minHeight: '350px' }}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-[1.5rem] font-bold text-[#0B0B0B] mb-2">Message Sent!</h3>
        <p className="text-[#555555] text-[1rem] max-w-sm mb-8">
          Thank you for reaching out. An agent will contact you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-[#0B0B0B] text-white font-semibold rounded-[16px] hover:bg-[#333333] transition-colors text-[1rem]"
          style={{ padding: '16px 32px', marginTop: '32px' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full bg-white" style={{ padding: '40px', gap: '24px', boxSizing: 'border-box' }}>
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <label className="text-[0.9rem] text-[#555555] font-semibold text-left">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          required
          className="bg-transparent border border-[#E5E5E5] rounded-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B] transition-all text-[1rem] w-full"
          style={{ padding: '12px 16px' }}
        />
      </div>
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <label className="text-[0.9rem] text-[#555555] font-semibold text-left">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@framer.com"
          required
          className="bg-transparent border border-[#E5E5E5] rounded-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B] transition-all text-[1rem] w-full"
          style={{ padding: '12px 16px' }}
        />
      </div>
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <label className="text-[0.9rem] text-[#555555] font-semibold text-left">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          rows={4}
          className="bg-transparent border border-[#E5E5E5] rounded-[12px] text-[#0B0B0B] outline-none focus:border-[#0B0B0B] transition-all resize-none text-[1rem] w-full"
          style={{ padding: '12px 16px' }}
        ></textarea>
      </div>
      <div className="w-full mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0B0B0B] text-white font-semibold rounded-[16px] hover:bg-[#333333] transition-colors text-[1rem] w-full disabled:opacity-70 flex items-center justify-center gap-2"
          style={{ padding: '16px' }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}
