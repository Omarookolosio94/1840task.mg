import React, {
  useState,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
} from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isRequired?: boolean;
  instruction?: string;
  error?: string;
  boxClassName?: string;
  textareaClassName?: string;
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  {
    label = '',
    isRequired = false,
    instruction = '',
    error = '',
    boxClassName = '',
    textareaClassName = '',
    autoResize = true,
    rows = 3,
    value,
    onChange,
    ...rest
  },
  ref
) {
  const [currentValue, setCurrentValue] = useState(value || '');

  useEffect(() => {
    setCurrentValue(value || '');
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(event.target.value);
    if (onChange) onChange(event);
  };

  const handleResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  return (
    <fieldset className={`textarea-container ${boxClassName}`}>
      {label && (
        <label htmlFor={rest.id} className="textarea-label">
          {label} {isRequired && <span>*</span>}
        </label>
      )}

      <div className="textarea-wrapper">
        <textarea
          ref={ref}
          value={currentValue}
          rows={rows}
          onChange={(e) => {
            handleChange(e);
            handleResize(e);
          }}
          {...rest}
          className={`textarea-field ${textareaClassName}`}
        />
      </div>

      {instruction && (
        <span className="textarea-instruction">{instruction}</span>
      )}

      {error && (
        <div className="textarea-error-container">
          <span className="iconify mi--circle-warning"></span>
          <span className="textarea-error-text">{error}</span>
        </div>
      )}
    </fieldset>
  );
});

export default TextArea;
