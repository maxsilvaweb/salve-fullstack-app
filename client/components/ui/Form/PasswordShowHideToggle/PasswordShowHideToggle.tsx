import React from 'react';
import { EyeIcon } from 'lucide-react';

interface PasswordShowHideToggleProps {
  isActive: boolean;
}

const PasswordShowHideToggle: React.FC<PasswordShowHideToggleProps> = ({
  isActive,
}) => {
  return (
    <EyeIcon
      className={`${
        isActive ? 'text-white' : ''
      } hover:text-white-500 absolute right-3 mt-[-28px] h-5 w-5 cursor-pointer text-slate-700 group-hover:text-white`}
    />
  );
};

export default PasswordShowHideToggle;
