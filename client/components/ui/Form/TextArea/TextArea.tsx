import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextArea = forwardRef(
  ({ name, label, disabled, submitted = false, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          ref={ref}
          className={`block h-44 w-full appearance-none rounded-md border border-gray-300 bg-gray-100 px-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm ${
            (submitted || disabled) && 'cursor-not-allowed'
          }`}
          {...props}
        />
      </>
    );
  }
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  submitted: PropTypes.bool,
  props: PropTypes.object,
};

TextArea.displayName = 'TextArea';

export default TextArea;
