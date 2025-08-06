'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  rows = 3,
  className = '',
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const renderField = (field: any) => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
          />
        );

      case 'select':
        return (
          <select
            {...field}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
          >
            <option value=''>Select an option</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`}
          />
        );
    }
  };

  return (
    <div className='space-y-2'>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => renderField(field)}
      />

      {error && (
        <div className='flex items-center space-x-1 text-sm text-red-600'>
          <AlertTriangle className='w-4 h-4' />
          <span>{error.message as string}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
