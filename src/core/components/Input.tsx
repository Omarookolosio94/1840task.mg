import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { numbersOnly } from '../utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  boxClassName?: string;
  isRequired?: boolean;
  instruction?: string;
  error?: string;
  type?: string;
  dataList?: DataListItem[];
  label?: string;
  isNumberOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    type = 'text',
    boxClassName = '',
    label = '',
    instruction = '',
    isRequired = false,
    dataList = [],
    error = '',
    isNumberOnly = false,
    children = <></>,
    ...rest
  },
  ref
) {
  const [inputType] = useState(type);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumberOnly) {
      numbersOnly(event);
    }
  };

  return (
    <fieldset className={`input-container ${boxClassName}`}>
      {label && (
        <label htmlFor={rest?.id} className="input-label">
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <div className="input-wrapper">
        <input
          ref={ref}
          type={inputType}
          autoComplete="on"
          aria-autocomplete="none"
          onKeyDown={handleKeyDown}
          {...rest}
          className="input-field"
        />
      </div>

      {dataList?.length > 0 && (
        <datalist id={rest?.list}>
          {dataList.map((data) => (
            <option key={data?.value} value={data?.value}>
              {data?.name}
            </option>
          ))}
        </datalist>
      )}

      {children}

      {instruction && <span className="input-instruction">{instruction}</span>}

      {error && (
        <div className="input-error-container">
          <span className="input-error-text">{error}</span>
        </div>
      )}
    </fieldset>
  );
});

export default Input;
