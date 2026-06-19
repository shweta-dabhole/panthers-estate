"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Can I get help with paperwork and registration?",
    answer: "Yes, our team of experts provides full support for paperwork and registration to ensure a smooth process.",
  },
  {
    question: "What if I'm looking for a home loan?",
    answer: "We partner with several leading banks to help you secure the best home loan rates tailored to your needs.",
  },
  {
    question: "How quickly can I schedule a property visit?",
    answer: "You can schedule a visit within 24 hours. Just reach out to us, and we'll arrange a convenient time.",
  },
  {
    question: "Are your listings updated regularly?",
    answer: "Absolutely! We update our listings daily to ensure you have access to the most current properties on the market.",
  },
  {
    question: "Can I sell my property here?",
    answer: "Yes, you can list your property with us. Our network ensures your property reaches the right buyers quickly.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="w-full flex flex-col cursor-pointer border-b border-[#e5e5e5] transition-colors" onClick={() => toggleFAQ(index)} style={{ padding: '24px 0' }}>
            <div className="w-full flex items-center justify-between">
              <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#191919', fontFamily: '"Roboto", sans-serif', margin: 0, paddingRight: '20px' }}>
                {faq.question}
              </h3>
              <div className="flex items-center justify-center transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', minWidth: '24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
            <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}>
              <p style={{ fontSize: '16px', color: '#757575', fontFamily: '"Roboto", sans-serif', lineHeight: 1.6, marginTop: '16px', paddingRight: '40px', textTransform: 'none' }}>
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
