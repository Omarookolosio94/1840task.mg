import React, { forwardRef, SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  options?: DataListItem[];
  label?: string;
  boxClassName?: string;
  defaultName?: string;
  defaultValue?: string | number;
  isRequired?: boolean;
  instruction?: string;
  error?: string;
  hideError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  {
    boxClassName = '',
    label = '',
    instruction = '',
    isRequired = false,
    hideError = false,
    options = [],
    defaultName = 'Select an option',
    defaultValue = '',
    error = '',
    ...rest
  },
  ref
) {
  return (
    <fieldset className={`select-container ${boxClassName}`}>
      {label && (
        <label htmlFor={rest?.id} className="select-label">
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <select ref={ref} {...rest} className="select-field">
        {defaultName && (
          <option key={defaultValue} value={defaultValue}>
            {defaultName}
          </option>
        )}

        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {instruction && <span className="select-instruction">{instruction}</span>}

      {!hideError && error && (
        <div className="select-error-container">
          <span className="select-error-text">{error}</span>
        </div>
      )}
    </fieldset>
  );
});

export default Select;
