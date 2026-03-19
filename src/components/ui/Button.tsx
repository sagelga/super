'use client';

import React from 'react';
import Link from 'next/link';

// Button Props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Reusable Button Component
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant classes - Using custom brand and accent colors
  const variantClasses = {
    primary: 'bg-brand text-cream hover:bg-brand-600 focus:ring-brand dark:bg-brand-400 dark:hover:bg-brand-500 dark:focus:ring-brand-300',
    secondary: 'bg-surface text-cream hover:bg-rim focus:ring-accent dark:bg-rim dark:hover:bg-surface dark:focus:ring-accent',
    outline: 'border-2 border-brand text-brand hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-900 focus:ring-brand',
    ghost: 'text-brand hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900 focus:ring-brand',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Icon component wrapper
  const IconWrapper: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <span className={children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : ''}>
      {icon}
    </span>
  );
  
  // If href is provided, render as Link
  if (href) {
    const linkContent = (
      <>
        {loading && <LoadingSpinner />}
        {icon && iconPosition === 'left' && <IconWrapper icon={icon} />}
        {children}
        {icon && iconPosition === 'right' && <IconWrapper icon={icon} />}
      </>
    );
    
    if (external) {
      return (
        <Link
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </Link>
      );
    }
    
    return (
      <Link href={href} className={combinedClasses}>
        {linkContent}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && <IconWrapper icon={icon} />}
      {children}
      {icon && iconPosition === 'right' && <IconWrapper icon={icon} />}
    </button>
  );
};

// IconButton - Circular button for icons only
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  label: string; // Accessibility label
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-800',
  };
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
};

export default Button;
