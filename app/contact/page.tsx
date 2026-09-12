'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="font-serif text-4xl font-bold text-dark">Contact Rose Cake House</h1>
          <p className="text-xs sm:text-sm text-graytext font-sans">
            We are here to assist with custom wedding cake consultations, birthday orders, or islandwide delivery inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-white rounded-4xl p-8 border border-pink-soft/60 shadow-luxury space-y-6">
            <h3 className="font-serif text-xl font-bold text-dark pb-3 border-b border-pink-soft">
              Rose Cake House Flagship
            </h3>

            <div className="space-y-4 text-xs font-sans text-dark">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-soft text-pink-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Flagship Boutique</span>
                  <span className="text-graytext">No. 42, Galle Road, Colombo 03, Sri Lanka</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-soft text-pink-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Direct Hotline</span>
                  <span className="text-graytext">+94 77 123 4567 / +94 11 234 5678</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-soft text-pink-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Email Inquiries</span>
                  <span className="text-graytext">orders@rosecakehouse.lk</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-pink-soft">
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-500 text-white text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Rose Cake House on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-4xl p-8 sm:p-10 border border-pink-soft/60 shadow-luxury">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-pink-soft text-pink-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-dark">Message Received!</h3>
                <p className="text-xs text-graytext max-w-sm mx-auto">
                  Our Rose Cake House concierge team will respond within 2 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <h3 className="font-serif text-xl font-bold text-dark pb-3 border-b border-pink-soft">
                  Send Us a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
                      className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kasun@example.lk"
                      className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-dark block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Custom Wedding Cake Consultation"
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-dark block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event date, delivery location in Sri Lanka, or specific cake design..."
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-xs font-bold py-4 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
