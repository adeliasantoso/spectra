import React, { useState, useEffect } from 'react';

// Floating Label Input
export const FloatingInput = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  className = "",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [_hasValue, _setHasValue] = useState(false);

  useEffect(() => {
    _setHasValue(value && value.length > 0);
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          peer w-full px-4 pt-6 pb-2 border-2 rounded-lg transition-all duration-200 focus:outline-none
          ${error 
            ? 'border-red-500 focus:border-red-500 bg-red-50' 
            : 'border-gray-300 focus:border-blue-500 bg-white'
          }
          ${_hasValue || isFocused ? 'pt-6 pb-2' : 'py-4'}
        `}
        placeholder=""
        {...props}
      />
      
      <label className={`
        absolute left-4 transition-all duration-200 pointer-events-none
        ${_hasValue || isFocused 
          ? 'top-2 text-xs font-medium' 
          : 'top-1/2 -translate-y-1/2 text-base'
        }
        ${error 
          ? 'text-red-600' 
          : isFocused 
            ? 'text-blue-600' 
            : 'text-gray-500'
        }
      `}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Success/Error Icons */}
      {value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {error ? (
            <span className="text-red-500 animate-wiggle">❌</span>
          ) : (
            <span className="text-green-500 success-bounce">✅</span>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 error-shake">
          {error}
        </p>
      )}
    </div>
  );
};

// Enhanced Textarea
export const FloatingTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required = false,
  rows = 4,
  className = "",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [_hasValue, _setHasValue] = useState(false);

  useEffect(() => {
    _setHasValue(value && value.length > 0);
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative ${className}`}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows}
        className={`
          peer w-full px-4 pt-6 pb-2 border-2 rounded-lg transition-all duration-200 focus:outline-none resize-vertical
          ${error 
            ? 'border-red-500 focus:border-red-500 bg-red-50' 
            : 'border-gray-300 focus:border-blue-500 bg-white'
          }
        `}
        placeholder=""
        {...props}
      />
      
      <label className={`
        absolute left-4 top-2 text-xs font-medium transition-all duration-200 pointer-events-none
        ${error 
          ? 'text-red-600' 
          : isFocused 
            ? 'text-blue-600' 
            : 'text-gray-500'
        }
      `}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 error-shake">
          {error}
        </p>
      )}
    </div>
  );
};

// Enhanced Checkbox
export const EnhancedCheckbox = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  className = "",
  ...props 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (e) => {
    setIsAnimating(true);
    onChange(e);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <label className={`flex items-start space-x-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <div className={`
          w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
          ${checked 
            ? 'bg-blue-600 border-blue-600' 
            : 'border-gray-300 group-hover:border-gray-400'
          }
          ${isAnimating ? 'animate-bounce-in' : ''}
        `}>
          {checked && (
            <svg className="w-3 h-3 text-white animate-bounce-in" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-body-small text-gray-700 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
};

// Progress Stepper
export const FormStepper = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${index + 1 <= currentStep 
                ? 'bg-blue-600 text-white animate-bounce-in' 
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {index + 1 <= currentStep ? '✓' : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-12 h-1 mx-2 transition-all duration-500
                ${index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-body-small text-gray-600">
        Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
      </p>
    </div>
  );
};

// Form Validation Helper
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `Invalid ${rule.label || field}`;
    } else if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
    } else if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must be less than ${rule.maxLength} characters`;
    }
  });
  
  return errors;
};

// Success Message Component
export const FormSuccessMessage = ({ message, onClose }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 animate-bounce-in">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl animate-heartbeat">🎉</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-heading-4 text-green-800">Success!</h3>
          <p className="text-body-small text-green-700 mt-1">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-green-400 hover:text-green-600 transition-colors hover-bounce"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default {
  FloatingInput,
  FloatingTextarea,
  EnhancedCheckbox,
  FormStepper,
  validateForm,
  FormSuccessMessage
};