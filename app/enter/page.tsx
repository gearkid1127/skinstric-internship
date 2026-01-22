'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  validateNameOrLocation, 
  normalizeText, 
  type FormData, 
  type FormErrors, 
  type TouchedFields 
} from '../../lib/validation';
import { submitPhaseOne, saveToLocalStorage } from '../../lib/api';

export default function EnterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    location: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    const error = validateNameOrLocation(value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return !error;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validate in real-time if field has been touched or submit attempted
    if (touched[field] || submitAttempted) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field, formData[field]);
  };

  const isFormValid = () => {
    const nameValid = !validateNameOrLocation(formData.name);
    const locationValid = !validateNameOrLocation(formData.location);
    return nameValid && locationValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // Validate all fields
    const nameValid = validateField('name', formData.name);
    const locationValid = validateField('location', formData.location);
    
    if (!nameValid || !locationValid || isLoading) {
      return;
    }

    setIsLoading(true);
    
    try {
      const normalizedData = {
        name: normalizeText(formData.name),
        location: normalizeText(formData.location)
      };
      
      const result = await submitPhaseOne(normalizedData);
      
      if (result.success) {
        saveToLocalStorage('skinstric.phase1', normalizedData);
        router.push('/testing');
      } else {
        // Handle API error - you might want to show this error to the user
        console.error('API Error:', result.error);
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowError = (field: keyof FormData) => {
    return (touched[field] || submitAttempted) && errors[field];
  };

  const isButtonDisabled = !isFormValid() || isLoading;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="form-title">Phase 1</h1>
      
      <div className="input-group">
        <label htmlFor="name" className="input-label">
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`input-field ${shouldShowError('name') ? 'error' : ''}`}
          disabled={isLoading}
        />
        {shouldShowError('name') && (
          <span className="error-text">{errors.name}</span>
        )}
      </div>

      <div className="input-group">
        <label htmlFor="location" className="input-label">
          Your location
        </label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          onBlur={() => handleBlur('location')}
          className={`input-field ${shouldShowError('location') ? 'error' : ''}`}
          disabled={isLoading}
        />
        {shouldShowError('location') && (
          <span className="error-text">{errors.location}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        className="primary-button"
      >
        {isLoading ? 'Submitting…' : 'Proceed'}
      </button>
    </form>
  );
}
