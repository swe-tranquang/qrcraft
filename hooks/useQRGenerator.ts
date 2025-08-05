'use client';

import { useState, useCallback } from 'react';
import { QRGeneratorState, QRCodeOptions, QRCodeResult, QRCustomization } from '@/types';
import { createQRCodeResult, formatURL } from '@/lib/qr-generator';
import { validateQRInput, sanitizeInput } from '@/lib/validation';

/**
 * Custom hook for QR code generation
 */
export function useQRGenerator() {
  const [state, setState] = useState<QRGeneratorState>({
    text: '',
    isGenerating: false,
    qrResult: null,
    error: null,
  });

  const [customization, setCustomization] = useState<QRCustomization>({
    size: 256,
    errorCorrectionLevel: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
  });

  /**
   * Update input text
   */
  const updateText = useCallback((newText: string) => {
    setState(prev => ({
      ...prev,
      text: newText,
      error: null, // Clear error when user types
    }));
  }, []);

  /**
   * Update customization settings
   */
  const updateCustomization = useCallback((newCustomization: QRCustomization) => {
    setCustomization(newCustomization);
  }, []);

  /**
   * Generate QR code
   */
  const generateQR = useCallback(async (overrideOptions?: Partial<QRCodeOptions>) => {
    const sanitizedText = sanitizeInput(state.text);
    
    // Validate input
    const validation = validateQRInput(sanitizedText);
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        error: validation.error || 'Invalid input',
        qrResult: null,
      }));
      return null;
    }

    // Format URL if needed
    const formattedText = validation.type === 'url' 
      ? formatURL(sanitizedText) 
      : sanitizedText;

    setState(prev => ({
      ...prev,
      isGenerating: true,
      error: null,
    }));

    try {
      const qrOptions: QRCodeOptions = {
        text: formattedText,
        size: customization.size,
        errorCorrectionLevel: customization.errorCorrectionLevel,
        foregroundColor: customization.foregroundColor,
        backgroundColor: customization.backgroundColor,
        ...overrideOptions,
      };

      const result = await createQRCodeResult(qrOptions);

      setState(prev => ({
        ...prev,
        isGenerating: false,
        qrResult: result,
        error: null,
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate QR code';
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
        qrResult: null,
      }));

      return null;
    }
  }, [state.text, customization]);

  /**
   * Generate QR with current customization
   */
  const generateWithCustomization = useCallback(async () => {
    return await generateQR();
  }, [generateQR]);

  /**
   * Clear current QR code
   */
  const clearQR = useCallback(() => {
    setState(prev => ({
      ...prev,
      qrResult: null,
      error: null,
    }));
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setState({
      text: '',
      isGenerating: false,
      qrResult: null,
      error: null,
    });
    setCustomization({
      size: 256,
      errorCorrectionLevel: 'M',
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
    });
  }, []);

  return {
    // State
    text: state.text,
    isGenerating: state.isGenerating,
    qrResult: state.qrResult,
    error: state.error,
    customization,
    
    // Actions
    updateText,
    updateCustomization,
    generateQR,
    generateWithCustomization,
    clearQR,
    reset,
  };
}