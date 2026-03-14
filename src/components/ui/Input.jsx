import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-2"
    >
      {label && (
        <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 input-focus-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800/80 dark:bg-slate-900/30 dark:ring-offset-slate-950 dark:text-slate-50 transition-colors backdrop-blur-sm",
          error && "border-red-500 focus-visible:ring-red-500/50 focus-visible:border-red-500 dark:border-red-500/80 bg-red-50/50 dark:bg-red-500/5",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';
