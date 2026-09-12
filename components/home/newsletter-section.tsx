'use client';

import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-pink-primary via-pink-deep to-pink-rose rounded-4xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-soft-pink">
          {/* Background Decorative Circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto text-white">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Get 15% Off Your First Order
            </h2>

            <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg mx-auto">
              Join the Maison VIP Circle. Be the first to receive seasonal cake tastings, exclusive secret menus, and complimentary birthday upgrades.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-3xl inline-flex items-center gap-2 text-sm font-semibold"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span>Welcome! Check your email for your 15% discount code: <strong>FIRST15</strong></span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/95 text-dark placeholder:text-graytext text-xs sm:text-sm font-sans focus:outline-none focus:ring-4 focus:ring-white/40 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-dark text-white font-sans text-xs sm:text-sm font-bold px-8 py-4 rounded-full hover:bg-white hover:text-pink-primary transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-white/70 font-sans">
              No spam. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
