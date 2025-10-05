"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { createPortal } from "react-dom";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  placeholder?: string;
}

export default function EmojiPicker({ value, onChange, placeholder = "🎯" }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
    setShowPicker(false);
  };

  const handleButtonClick = () => {
    if (!showPicker && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setShowPicker(!showPicker);
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
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
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-20 px-3 py-2 bg-brand-cream/10 border border-brand-gold/30 rounded-lg text-brand-cream placeholder:text-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-center text-2xl"
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 rounded-lg text-brand-cream transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.3)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 text-sm font-medium relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/40 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
        >
          {showPicker ? "✕" : "😀"}
        </button>
      </div>

      {showPicker && typeof document !== 'undefined' && createPortal(
        <div
          ref={pickerRef}
          className="fixed z-[9999] shadow-2xl"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <Picker
            onEmojiClick={handleEmojiClick}
            theme={Theme.DARK}
            searchPlaceHolder="Search emoji..."
            width={Math.min(320, window.innerWidth - 40)}
            height={400}
          />
        </div>,
        document.body
      )}
    </>
  );
}
