import React, { forwardRef } from 'react';

export const ClayInput = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`space-y-1.5 text-left ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-clay-olive font-display pl-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-clay-olive pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full h-12 rounded-[20px] bg-[#EFE9DC] shadow-clay-input text-clay-forest font-sans placeholder:text-clay-sage/70 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-clay-copper ${
            Icon ? 'pl-11' : ''
          } ${error ? 'ring-2 ring-clay-amber' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-bold text-clay-amber pl-2 font-display">
          {error}
        </p>
      )}
    </div>
  );
});

ClayInput.displayName = 'ClayInput';
