'use client';

import { QRCodeResult } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { useState } from 'react';
import { generateQRCodeSVG, generateQRCodePDF, downloadFile, createFilename, copyToClipboard } from '@/lib/file-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './ui/AnimatedComponents';
import { useToast } from '@/hooks/useToast';

interface QRDisplayProps {
  qrResult: QRCodeResult;
  onClear: () => void;
  customization?: {
    size: number;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
    foregroundColor: string;
    backgroundColor: string;
  };
}

export function QRDisplay({ qrResult, onClear, customization }: QRDisplayProps) {
  const { dataURL, text, size, timestamp } = qrResult;
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const { success: showSuccess, error: showError } = useToast();



  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleCopyImage = async () => {
    try {
      const success = await copyToClipboard(dataURL);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        showSuccess('QR code copied to clipboard!');
      } else {
        showError('Failed to copy to clipboard');
      }
    } catch {
      showError('Failed to copy to clipboard');
    }
  };

  const handleDownloadPNG = () => {
    try {
      const filename = createFilename('qrcraft', 'png');
      
      // Ensure dataURL is valid PNG format
      if (!dataURL.startsWith('data:image/png;base64,')) {
        throw new Error('Invalid PNG data format');
      }
      
      downloadFile(dataURL, filename);
      showSuccess('PNG downloaded successfully!');
    } catch (error) {
      console.error('PNG download failed:', error);
      showError('Failed to download PNG');
    }
  };

  const handleDownloadSVG = async () => {
    setIsExporting('svg');
    try {
      const svgString = await generateQRCodeSVG({
        text,
        size: customization?.size || size,
        errorCorrectionLevel: customization?.errorCorrectionLevel || 'M',
        foregroundColor: customization?.foregroundColor || '#000000',
        backgroundColor: customization?.backgroundColor || '#FFFFFF',
      });
      
      const filename = createFilename('qrcraft', 'svg');
      downloadFile(svgString, filename, 'image/svg+xml');
      showSuccess('SVG downloaded successfully!');
    } catch (exportError) {
      console.error('SVG export failed:', exportError);
      showError('Failed to export SVG. Please try again.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting('pdf');
    try {
      const pdfBlob = await generateQRCodePDF({
        text,
        size: customization?.size || size,
        errorCorrectionLevel: customization?.errorCorrectionLevel || 'M',
        foregroundColor: customization?.foregroundColor || '#000000',
        backgroundColor: customization?.backgroundColor || '#FFFFFF',
      });
      
      const filename = createFilename('qrcraft', 'pdf');
      downloadFile(pdfBlob, filename);
      showSuccess('PDF downloaded successfully!');
    } catch (exportError) {
      console.error('PDF export failed:', exportError);
      showError('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card variant="glass" className="overflow-hidden">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="gradient-text">Your QR Code is Ready! 🎉</CardTitle>
          </motion.div>
        </CardHeader>
      
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* QR Code Display */}
          <motion.div 
            className="flex-shrink-0 flex flex-col items-center space-y-4 max-w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-cyan-400/20 rounded-2xl blur-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="relative bg-white p-6 rounded-2xl shadow-2xl shadow-sky-200/20 border-2 border-sky-100/50 overflow-hidden"
                whileHover={{ 
                  scale: size >= 512 ? 1.02 : 1.05,
                  rotateY: size >= 512 ? 2 : 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex justify-center items-center"
                >
                  <Image
                    src={dataURL}
                    alt="Generated QR Code"
                    width={size}
                    height={size}
                    className={`block rounded-lg ${size >= 512 ? 'max-w-full max-h-[400px] w-auto h-auto object-contain' : ''}`}
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* QR Info */}
            <motion.div 
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div 
                className="inline-flex items-center space-x-4 px-4 py-2 bg-sky-50/80 rounded-full backdrop-blur-sm border border-sky-200/50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs font-medium text-slate-600">
                  {size}×{size}px
                </span>
                <span className="w-1 h-1 bg-sky-400 rounded-full"></span>
                <span className="text-xs font-medium text-slate-600">
                  {formatDate(timestamp)}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* QR Details & Actions */}
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Content Display */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Content
              </h4>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-50/50 to-cyan-50/50 rounded-xl"></div>
                <div className="relative p-4 bg-sky-50/50 rounded-xl border border-sky-200/40 backdrop-blur-sm">
                  <code className="text-sm text-slate-700 break-all font-mono leading-relaxed">
                    {text}
                  </code>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Primary Downloads */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleDownloadPNG}
                    className="w-full flex items-center justify-center space-x-2 py-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>PNG</span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleDownloadSVG}
                    variant="secondary"
                    className="w-full flex items-center justify-center space-x-2 py-3"
                    disabled={isExporting === 'svg'}
                  >
                    <AnimatePresence mode="wait">
                      {isExporting === 'svg' ? (
                        <LoadingSpinner size={16} />
                      ) : (
                        <motion.svg 
                          key="svg-icon"
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 0 }}
                          exit={{ rotate: 180 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span>SVG</span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleDownloadPDF}
                    variant="secondary"
                    className="w-full flex items-center justify-center space-x-2 py-3"
                    disabled={isExporting === 'pdf'}
                  >
                    <AnimatePresence mode="wait">
                      {isExporting === 'pdf' ? (
                        <LoadingSpinner size={16} />
                      ) : (
                        <motion.svg 
                          key="pdf-icon"
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 0 }}
                          exit={{ rotate: 180 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <span>PDF</span>
                  </Button>
                </motion.div>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  onClick={handleCopyImage}
                  className="w-full flex items-center justify-center space-x-2 py-3"
                >
                  {copySuccess ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onClear}
                  className="w-full flex items-center justify-center space-x-2 py-3 text-slate-600 hover:text-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear</span>
                </Button>
              </div>
            </div>

            {/* Export Tips */}
            <div className="bg-sky-50/70 border border-sky-200/60 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="text-sky-500 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-sky-700 mb-2">
                    Export Formats
                  </h5>
                  <ul className="text-sm text-sky-600 space-y-1">
                    <li><strong>PNG:</strong> Perfect for web use and social media</li>
                    <li><strong>SVG:</strong> Vector format for print and scalability</li>
                    <li><strong>PDF:</strong> Print-ready with QR details included</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
      </Card>
    </motion.div>
  );
}