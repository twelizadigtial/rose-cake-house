'use client';

import React from 'react';
import { Phone, Mail, MessageCircle, Truck } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/icons';

export function AnnouncementBar() {
  return (
    <div className="bg-pink-primary text-white text-xs py-2.5 px-4 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <Truck className="w-4 h-4 animate-bounce" />
          <span>🚚 Rose Cake House | Islandwide Free delivery for orders above Rs. 6,000</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div className="hidden md:flex items-center gap-4 border-r border-white/20 pr-4">
            <a
              href="tel:+94771234567"
              className="flex items-center gap-1.5 hover:text-pink-soft transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+94 77 123 4567</span>
            </a>
            <a
              href="mailto:orders@rosecakehouse.lk"
              className="flex items-center gap-1.5 hover:text-pink-soft transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>orders@rosecakehouse.lk</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 transition-transform"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
