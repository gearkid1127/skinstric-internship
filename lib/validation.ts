// Normalization helper
export function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

// Validation helper
export function validateNameOrLocation(value: string): string | null {
  const normalized = normalizeText(value);
  
  if (!normalized) {
    return 'This field is required';
  }
  
  // Check for digits
  if (/\d/.test(normalized)) {
    return 'Numbers are not allowed';
  }
  
  // Check for allowed characters: letters, spaces, apostrophes (both ' and '), hyphens
  const allowedPattern = /^[a-zA-Z\s'\'-]+$/;
  if (!allowedPattern.test(normalized)) {
    return 'Only letters, spaces, apostrophes, and hyphens are allowed';
  }
  
  return null; // No error
}

export interface FormData {
  name: string;
  location: string;
}

export interface FormErrors {
  name?: string;
  location?: string;
}

export interface TouchedFields {
  name: boolean;
  location: boolean;
}