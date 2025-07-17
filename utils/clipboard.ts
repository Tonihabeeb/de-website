/**
 * Clipboard utility with browser compatibility fallbacks
 */

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  } catch (err) {
    console.warn('Clipboard copy failed:', err);
    return false;
  }
};

export const isClipboardSupported = (): boolean => {
  return !!(navigator.clipboard || document.queryCommandSupported?.('copy'));
}; 