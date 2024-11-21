import { Spinner } from '@/components/ui/Spinner';
import { ArrowRightIcon } from 'lucide-react';

interface SubmitButtonProps {
  label: string;
  submitted?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  submitted = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`w-auto w-full rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black underline shadow-sm hover:underline focus:outline-none group-hover:underline ${
        submitted || (disabled && 'cursor-not-allowed')
      }`}
      disabled={disabled || submitted}
      {...props}
    >
      {submitted && (
        <Spinner className="h-4 w-4" variant="solid" color="white" />
      )}
      <span className="inline-block leading-3">
        {label}
        <ArrowRightIcon className="text-white-500 ml-0.5 mt-[-1px] inline-block h-4 w-4 underline group-hover:text-white" />
      </span>
    </button>
  );
};

export default SubmitButton;
