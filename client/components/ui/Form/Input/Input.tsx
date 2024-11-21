import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  submitted?: boolean;
  error?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = 'text',
      disabled,
      submitted = false,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className="mb-3 block text-sm text-white">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          disabled={disabled}
          className={` ${
            error && 'border-red-500'
          } border-1 block w-full appearance-none rounded-sm border-slate-100 px-3 py-2 text-white placeholder:text-gray-500 placeholder:text-opacity-50 focus:border-slate-500 focus:outline-white focus:ring-slate-500 sm:text-sm ${
            (submitted || disabled) && 'cursor-not-allowed'
          }`}
          {...props}
        />
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
