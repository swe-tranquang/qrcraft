/**
 * Input validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  type: 'url' | 'text' | 'empty';
}

/**
 * Validate QR code input text
 */
export function validateQRInput(text: string): ValidationResult {
  const trimmedText = text.trim();

  // Check if empty
  if (!trimmedText) {
    return {
      isValid: false,
      error: 'Please enter some text or URL',
      type: 'empty',
    };
  }

  // Check if it's a URL
  if (isURL(trimmedText)) {
    return {
      isValid: true,
      type: 'url',
    };
  }

  // Check text length (QR codes have limits)
  if (trimmedText.length > 2000) {
    return {
      isValid: false,
      error: 'Text is too long (max 2000 characters)',
      type: 'text',
    };
  }

  // Valid text input
  return {
    isValid: true,
    type: 'text',
  };
}

/**
 * Check if text is a URL
 */
function isURL(text: string): boolean {
  // Check for protocol
  if (text.startsWith('http://') || text.startsWith('https://')) {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  // Check for domain-like pattern
  const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,}(\/.*)?$/;
  return domainPattern.test(text);
}

/**
 * Sanitize text input for QR generation
 */
export function sanitizeInput(text: string): string {
  return text.trim().replace(/[\r\n]+/g, ' ');
}