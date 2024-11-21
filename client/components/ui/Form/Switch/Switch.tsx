import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Switch as SwitchField } from '@headlessui/react';

const Switch = forwardRef(
  (
    {
      name,
      enabled,
      setEnabled,
      label,
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
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}
        <SwitchField
          ref={ref}
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-white-500' : 'bg-gray-200'
          } relative inline-flex h-8 w-16 items-center rounded-full`}
          {...props}
        >
          <span
            className={`${
              enabled ? 'translate-x-10' : 'translate-x-2'
            } inline-block h-4 w-4 rounded-full bg-white transition`}
          />
        </SwitchField>
      </>
    );
  }
);

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  setEnabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  props: PropTypes.object,
};

Switch.displayName = 'Switch';

export default Switch;
