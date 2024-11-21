import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';

const Select = forwardRef(
  (
    {
      size = 'w-full',
      defaultOption,
      name,
      label,
      data,
      selected,
      setSelected,
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
            className="mb-3 inline text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}

        <div className="flex w-full items-end justify-end">
          <div className={size}>
            <Listbox
              as="div"
              ref={ref}
              value={selected !== '' ? selected : defaultOption}
              onChange={setSelected}
              {...props}
            >
              {({ open }) => (
                <>
                  <div className="relative w-full">
                    <Listbox.Button className="focus:border-white-500 focus:ring-white-500 relative w-full cursor-pointer border-2 border-black bg-white px-3 py-2 text-left text-gray-800 placeholder:text-gray-500 placeholder:text-opacity-50 focus:bg-white focus:outline-none sm:text-sm">
                      <span className="block truncate">{selected}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg"
                    >
                      <Listbox.Options
                        static
                        className="z-50 max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                      >
                        {defaultOption && (
                          <Listbox.Option
                            key={defaultOption.code}
                            value={defaultOption}
                          >
                            <div
                              className={`${'text-gray-900'} relative cursor-default select-none py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                {defaultOption.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        )}
                        {data.map((item) => (
                          <Listbox.Option
                            key={item.code}
                            value={item}
                            className="z-50"
                          >
                            {({ selected, active }) => (
                              <div
                                className={`${
                                  active
                                    ? 'bg-black text-white'
                                    : 'text-gray-900'
                                } relative cursor-pointer select-none py-2 pl-8 pr-4`}
                              >
                                <span
                                  className={`${
                                    selected ? 'font-semibold' : 'font-normal'
                                  } block truncate`}
                                >
                                  {item.name}
                                </span>
                                {selected && (
                                  <span
                                    className={`text-white-500 absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
      </>
    );
  }
);

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
  setSelected: PropTypes.func,
};

Select.displayName = 'Select';

export default Select;
