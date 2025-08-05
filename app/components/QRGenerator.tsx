'use client';

import { useState } from 'react';
import { useQRGenerator } from '@/hooks/useQRGenerator';
import { QRDisplay } from './QRDisplay';
import { CustomizationPanel } from './CustomizationPanel';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { 
  AnimatedDiv, 
  AnimatedCard, 
  AnimatedPresenceWrapper, 
  LoadingSpinner,
  TypingText,
  staggerContainer,
  staggerItem,
  fadeInUp,
  scaleIn
} from './ui/AnimatedComponents';
import { motion } from 'framer-motion';

export function QRGenerator() {
  const {
    text,
    isGenerating,
    qrResult,
    error,
    customization,
    updateText,
    updateCustomization,
    generateQR,
    generateWithCustomization,
    clearQR,
  } = useQRGenerator();

  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await generateQR();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateText(e.target.value);
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section */}
      <AnimatedDiv variants={fadeInUp} className="text-center space-y-6 mb-12">
        <TypingText 
          text="QRCraft" 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed"
        >
          Create beautiful QR codes instantly with our modern, secure generator. 
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-purple-600 font-semibold">Perfect for URLs, text, and more.</span>
        </motion.p>
      </AnimatedDiv>

      {/* Input Section */}
      <AnimatedCard delay={0.2}>
        <Card variant="default">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Enter your content
              </label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleInputChange}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Enter a URL, text, or any content to generate QR code..."
                  className={`
                    w-full px-6 py-4 border-2 rounded-xl resize-none transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-sky-400/30 
                    placeholder:text-slate-400 text-base
                    bg-white/95 backdrop-blur-sm
                    ${inputFocused 
                      ? 'border-sky-400 shadow-lg shadow-sky-400/30' 
                      : 'border-sky-200/60'
                    }
                    ${error 
                      ? 'border-red-400 focus:ring-red-400/30 shadow-lg shadow-red-400/30' 
                      : ''
                    }
                  `}
                  rows={4}
                  maxLength={2000}
                />
                
                {/* Character count */}
                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                  <div className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium ${
                    text.length > 1800 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-sky-100 text-sky-600 border border-sky-200'
                  }`}>
                    {text.length}/2000
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg"></div>
                <div className="relative text-red-700 text-sm p-4 bg-red-50/90 rounded-lg border border-red-200 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Generate button */}
            <motion.div
              whileHover={{ scale: !text.trim() || isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: !text.trim() || isGenerating ? 1 : 0.98 }}
            >
              <Button
                type="submit"
                disabled={!text.trim() || isGenerating}
                className="w-full py-4 text-lg font-semibold"
                size="lg"
              >
                {isGenerating ? (
                  <motion.div 
                    className="flex items-center justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <LoadingSpinner size={16} />
                    <span>Generating QR Code...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Generate QR Code ✨
                  </motion.span>
                )}
              </Button>
              
              {/* Customization Hint */}
              {text.trim() && !qrResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center space-x-2 text-sm text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-purple-600 mt-4"
                >
                  <span>💡</span>
                  <span className="font-medium">Pro tip: Check out customization options below!</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    👇
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          </form>
        </CardContent>
        </Card>
      </AnimatedCard>

      {/* Customization Panel */}
      <AnimatedPresenceWrapper>
        {text.trim() && (
          <AnimatedDiv variants={fadeInUp} delay={0.3}>
            <CustomizationPanel
              customization={customization}
              onChange={updateCustomization}
              onApply={generateWithCustomization}
              isGenerating={isGenerating}
            />
          </AnimatedDiv>
        )}
      </AnimatedPresenceWrapper>

      {/* QR Display Section */}
      <AnimatedPresenceWrapper>
        {qrResult && (
          <AnimatedDiv variants={scaleIn} delay={0.4}>
            <QRDisplay qrResult={qrResult} onClear={clearQR} customization={customization} />
          </AnimatedDiv>
        )}
      </AnimatedPresenceWrapper>

      {/* Feature highlights */}
      <AnimatedPresenceWrapper>
        {!qrResult && !text.trim() && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
                             {[
                   { icon: '✨', title: 'Modern Design', desc: 'Beautiful, clean interface with smooth animations' },
                   { icon: '🔒', title: 'Privacy First', desc: 'No data stored on servers - completely secure' },
                   { icon: '📱', title: 'Mobile Ready', desc: 'Perfect responsive design on all devices' },
                 ].map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                                     <Card variant="default" className="text-center hover:shadow-xl hover:shadow-sky-200/25 transition-all duration-300 border border-sky-100/50">
                       <CardContent className="pt-6">
                         <motion.div 
                           className="text-4xl mb-4"
                           animate={{ 
                             scale: [1, 1.1, 1],
                             rotate: [0, 5, -5, 0]
                           }}
                           transition={{ 
                             duration: 3,
                             repeat: Infinity,
                             delay: index * 0.5 
                           }}
                         >
                           {feature.icon}
                         </motion.div>
                         <h3 className="font-semibold text-slate-700 mb-3">{feature.title}</h3>
                         <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                       </CardContent>
                     </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatedPresenceWrapper>
    </motion.div>
  );
}