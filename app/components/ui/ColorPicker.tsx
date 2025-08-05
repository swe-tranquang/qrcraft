'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export function ColorPicker({ label, value, onChange, presetColors }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const defaultPresets = [
    // QR Code classics
    '#000000', '#FFFFFF', 
    // Sky Blue palette
    '#0ea5e9', '#22d3ee', '#38bdf8', '#0284c7', '#0369a1', '#075985',
    // Accent colors
    '#3b82f6', '#60a5fa', '#8b5cf6', '#a78bfa',
    // Bold colors
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#ec4899'
  ];

  const colors = presetColors || defaultPresets;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center space-x-3 w-full p-3 border-2 rounded-xl transition-all duration-200 bg-white shadow-sm",
            isOpen 
              ? "border-sky-400 shadow-lg shadow-sky-200/50 bg-sky-50/50" 
              : "border-sky-200/60 hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-md"
          )}
        >
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-xl border-2 border-white shadow-lg ring-2 ring-sky-200/50"
              style={{ backgroundColor: value }}
            />
            {/* Color indicator dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-slate-700">
              {value.toUpperCase()}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Click to change color
            </div>
          </div>
          <svg 
            className={cn("w-5 h-5 text-sky-400 transition-transform duration-200", isOpen && "rotate-180")}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 p-6 bg-white border-2 border-sky-300/60 rounded-2xl shadow-2xl shadow-sky-200/30 z-20 backdrop-blur-lg">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  <h3 className="text-base font-semibold text-slate-800">Choose Color</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current color preview */}
              <div className="flex items-center space-x-3 p-3 bg-sky-50/60 rounded-xl border border-sky-200/50">
                <div 
                  className="w-8 h-8 rounded-xl border-2 border-white shadow-md"
                  style={{ backgroundColor: value }}
                />
                <div>
                  <div className="text-sm font-semibold text-slate-700">{value.toUpperCase()}</div>
                  <div className="text-xs text-slate-500">Current selection</div>
                </div>
              </div>
              
              {/* Custom color input */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-3">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
                  </svg>
                  <span>Custom Color</span>
                </label>
                <div className="relative">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-14 rounded-xl border-2 border-sky-200/60 cursor-pointer hover:border-sky-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  <div className="absolute inset-2 border border-white/50 rounded-lg pointer-events-none"></div>
                </div>
              </div>
              
              {/* Preset colors */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-4">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Popular Colors</span>
                </label>
                <div className="grid grid-cols-6 gap-2.5">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        onChange(color);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "relative w-12 h-12 rounded-xl border-2 transition-all duration-200 shadow-sm hover:shadow-lg group",
                        color === value 
                          ? "border-sky-400 shadow-lg shadow-sky-200/60 scale-105 ring-2 ring-sky-300/50" 
                          : "border-sky-200/60 hover:border-sky-300/80 hover:scale-110"
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {color === value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {/* Hover tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {color}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}