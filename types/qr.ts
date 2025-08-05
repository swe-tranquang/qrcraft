// QR Code related TypeScript types

export interface QRCodeOptions {
  text: string;
  size?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  foregroundColor?: string;
  backgroundColor?: string;
}

export interface QRCodeResult {
  dataURL: string;
  text: string;
  size: number;
  timestamp: number;
  id: string;
}

export interface QRGeneratorState {
  text: string;
  isGenerating: boolean;
  qrResult: QRCodeResult | null;
  error: string | null;
}

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCustomization {
  size: number;
  errorCorrectionLevel: QRErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
}