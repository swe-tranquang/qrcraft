import QRCode from 'qrcode';
import { QRCodeOptions, QRCodeResult } from '@/types';

/**
 * Generate QR code data URL from text input
 */
export async function generateQRCode(options: QRCodeOptions): Promise<string> {
  const {
    text,
    size = 256,
    errorCorrectionLevel = 'M',
    foregroundColor = '#000000',
    backgroundColor = '#FFFFFF',
  } = options;

  if (!text.trim()) {
    throw new Error('Text input cannot be empty');
  }

  try {
    const dataURL = await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
    });

    return dataURL;
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code result with metadata
 */
export async function createQRCodeResult(options: QRCodeOptions): Promise<QRCodeResult> {
  const dataURL = await generateQRCode(options);
  
  return {
    dataURL,
    text: options.text,
    size: options.size || 256,
    timestamp: Date.now(),
    id: generateQRId(),
  };
}

/**
 * Generate unique ID for QR code
 */
export function generateQRId(): string {
  return `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate URL format
 */
export function isValidURL(text: string): boolean {
  try {
    new URL(text);
    return true;
  } catch {
    // If it doesn't start with protocol, try adding https://
    try {
      new URL(`https://${text}`);
      return text.includes('.') && !text.includes(' ');
    } catch {
      return false;
    }
  }
}

/**
 * Format URL for QR code generation (add protocol if missing)
 */
export function formatURL(text: string): string {
  const trimmedText = text.trim();
  
  if (!trimmedText) return trimmedText;
  
  // If it's already a valid URL, return as is
  try {
    new URL(trimmedText);
    return trimmedText;
  } catch {
    // If it looks like a URL without protocol, add https://
    if (trimmedText.includes('.') && !trimmedText.includes(' ')) {
      return `https://${trimmedText}`;
    }
    // Otherwise return as plain text
    return trimmedText;
  }
}