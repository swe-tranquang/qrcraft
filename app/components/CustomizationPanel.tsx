'use client';

import { useState } from 'react';
import { QRCustomization, QRErrorCorrectionLevel } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { ColorPicker } from './ui/ColorPicker';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './ui/AnimatedComponents';

interface CustomizationPanelProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
  onApply: () => void;
  isGenerating: boolean;
}

export function CustomizationPanel({
  customization,
  onChange,
  onApply,
  isGenerating
}: CustomizationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sizeOptions = [
    { label: 'Small (128px)', value: 128 },
    { label: 'Medium (256px)', value: 256 },
    { label: 'Large (512px)', value: 512 },
    { label: 'Extra Large (1024px)', value: 1024 },
  ];

  const errorCorrectionOptions: { label: string; value: QRErrorCorrectionLevel; description: string }[] = [
    { label: 'Low (L)', value: 'L', description: '~7% recovery' },
    { label: 'Medium (M)', value: 'M', description: '~15% recovery' },
    { label: 'Quartile (Q)', value: 'Q', description: '~25% recovery' },
    { label: 'High (H)', value: 'H', description: '~30% recovery' },
  ];

  const updateCustomization = (updates: Partial<QRCustomization>) => {
    onChange({ ...customization, ...updates });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="default" className="transition-all duration-300 border-2 border-sky-200/60 hover:border-sky-300/80 bg-gradient-to-br from-white via-white to-sky-50/40">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center space-x-3"
            >
              {/* Eye-catching icon */}
              <motion.div 
                className="flex items-center justify-center w-10 h-10 gradient-bg rounded-xl shadow-lg shadow-sky-200/50"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </motion.div>
              
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <span>Customization Options</span>
                  <motion.span 
                    className="text-xs accent-gradient text-white px-3 py-1 rounded-full font-bold shadow-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    PRO
                  </motion.span>
                </CardTitle>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  {isExpanded ? 'Customize your QR code appearance' : 'Click to customize size, colors & more'}
                </p>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-12 w-12 p-0 rounded-xl shadow-lg border-sky-200 hover:border-sky-300"
              >
                <motion.svg 
                  className="w-5 h-5"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </Button>
            </motion.div>
          </div>
          
          {/* Hint when collapsed */}
          {!isExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center justify-center"
            >
              <motion.div 
                className="flex items-center space-x-2 text-xs text-sky-600 bg-sky-50/90 px-4 py-2 rounded-full border border-sky-200/70 shadow-sm"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>✨</span>
                <span className="font-semibold">Click to unlock advanced customization</span>
                <span>✨</span>
              </motion.div>
            </motion.div>
          )}
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="space-y-6 pt-0">
        {/* Size Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            QR Code Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {sizeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateCustomization({ size: option.value })}
                className={cn(
                  "p-3 text-sm rounded-lg border transition-all duration-200 font-medium",
                  customization.size === option.value
                    ? "bg-sky-50 border-sky-300 text-sky-700 shadow-sm"
                    : "bg-white border-sky-200/60 hover:border-sky-300 hover:bg-sky-50/50"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Foreground Color"
            value={customization.foregroundColor}
            onChange={(color) => updateCustomization({ foregroundColor: color })}
          />
          <ColorPicker
            label="Background Color"
            value={customization.backgroundColor}
            onChange={(color) => updateCustomization({ backgroundColor: color })}
          />
        </div>

        {/* Error Correction Level */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Error Correction Level
          </label>
          <div className="space-y-2">
            {errorCorrectionOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateCustomization({ errorCorrectionLevel: option.value })}
                className={cn(
                  "w-full flex items-center justify-between p-3 text-sm rounded-lg border transition-all duration-200",
                  customization.errorCorrectionLevel === option.value
                    ? "bg-sky-50 border-sky-300 text-sky-700 shadow-sm"
                    : "bg-white border-sky-200/60 hover:border-sky-300 hover:bg-sky-50/50"
                )}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-slate-500">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Colors */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Color Preview
          </label>
          <div className="flex items-center space-x-4 p-4 bg-sky-50/60 rounded-lg border border-sky-200/40">
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: customization.foregroundColor }}
              />
              <span className="text-sm text-slate-600">Foreground</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: customization.backgroundColor }}
              />
              <span className="text-sm text-slate-600">Background</span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <motion.div
          whileHover={{ scale: isGenerating ? 1 : 1.02 }}
          whileTap={{ scale: isGenerating ? 1 : 0.98 }}
        >
          <Button
            onClick={onApply}
            className="w-full"
            size="lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <motion.div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size={16} />
                <span>Applying...</span>
              </motion.div>
            ) : (
              "Apply Customization"
            )}
          </Button>
        </motion.div>

        {/* Reset to Defaults */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            onClick={() => {
              updateCustomization({
                size: 256,
                errorCorrectionLevel: 'M',
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF',
              });
            }}
            className="w-full text-sm"
          >
            Reset to Defaults
          </Button>
        </motion.div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}