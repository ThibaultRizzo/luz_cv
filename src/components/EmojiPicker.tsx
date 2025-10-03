"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  placeholder?: string;
}

export default function EmojiPicker({ value, onChange, placeholder = "🎯" }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
    setShowPicker(false);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative" ref={pickerRef}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-20 px-3 py-2 bg-brand-cream/10 border border-brand-gold/30 rounded-lg text-brand-cream placeholder:text-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-center text-2xl"
        />
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 bg-brand-gold/20 hover:bg-brand-gold/30 border border-brand-gold/30 rounded-lg text-brand-cream transition-colors text-sm font-medium"
        >
          {showPicker ? "✕" : "😀"}
        </button>
      </div>

      {showPicker && (
        <div className="fixed md:absolute z-50 mt-2 left-0 md:left-auto top-1/2 md:top-auto -translate-y-1/2 md:translate-y-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0">
          <Picker
            onEmojiClick={handleEmojiClick}
            theme={Theme.DARK}
            searchPlaceHolder="Search emoji..."
            width={Math.min(320, window.innerWidth - 40)}
            height={400}
          />
        </div>
      )}
    </div>
  );
}
