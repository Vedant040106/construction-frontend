import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Button = forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-[0_4px_14px_0_rgb(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow active:scale-[0.98] transition-all duration-200',
    outline: 'border-2 border-slate-200 bg-transparent hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 active:scale-[0.98] transition-all duration-200',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800/80 dark:text-slate-100 active:scale-[0.98] transition-all duration-200',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm font-semibold rounded-md',
    default: 'h-11 px-6 py-2 rounded-lg font-semibold',
    lg: 'h-12 px-8 text-lg font-semibold rounded-xl',
    icon: 'h-10 w-10 rounded-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
