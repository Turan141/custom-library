// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Input from '@components/Input';

// Styles
import styles from './InputCode.module.scss';

const KEY_CODE = {
  BACKSPACE: 8,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const CodeInputHTMLTypes = ['text', 'number'] as const;

export type CodeInputHTMLType = typeof CodeInputHTMLTypes[number];

export interface CodeInputProps {
  className?: string;
  id?: string;
  name?: string;
  type?: CodeInputHTMLType;
  fields?: number;
  value?: string[];
  placeholder?: string[],
  autoFocus?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  className,
  id,
  name,
  type = 'number',
  fields = 4,
  value: valueProp,
  placeholder = [],
  autoFocus = true,
  disabled,
  onChange,
  onComplete,
}) => {
  const $inputs = React.useRef<HTMLInputElement[]>([]);

  const [value, setValue] = React.useState<string[]>(() => {
    let initialValue;

    if (valueProp && valueProp.length) {
      initialValue = [];

      for (let i = 0; i < fields; i++) {
        initialValue.push(valueProp[i] || '');
      }
    } else {
      initialValue = Array(fields).fill('');
    }

    return initialValue;
  });

  const trigger = (value: string[] = []) => {
    const code = value.join('');

    onChange && onChange(code);

    if (code.length >= fields) {
      onComplete && onComplete(code);
    }
  };

  const handleChange = (event: any) => {
    const idx = parseInt(event.target.dataset.id);

    if (type === 'number') {
      event.target.value = event.target.value.replace(/[^\d]/gi, '');
    }

    if (
      event.target.value === '' ||
      (type === 'number' && !event.target.validity.valid)
    ) {
      return;
    }

    let next;

    const eventValue = event.target.value;

    const newValue = [...value];

    if (eventValue.length > 1) {
      let nextIndex = eventValue.length + idx - 1;

      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }

      next = $inputs.current[nextIndex];

      const split = eventValue.split('');

      split.forEach((item: string, index: number) => {
        const cursor = idx + index;

        if (cursor < fields) {
          newValue[cursor] = item;
        }
      });

      setValue(newValue);
    } else {
      next = $inputs.current[idx + 1];
      newValue[idx] = eventValue;
      setValue(newValue);
    }

    if (next) {
      next.focus();
      next.select();
    }

    trigger(newValue);
  };

  const handleKeyDown = (event: any) => {
    const index = parseInt(event.target.dataset.id);

    const prevIndex = index - 1;
    const nextIndex = index + 1;

    const prev = $inputs.current[prevIndex];
    const next = $inputs.current[nextIndex];

    switch (event.keyCode) {
      case KEY_CODE.BACKSPACE: {
        event.preventDefault();

        const newValue = [...value];

        if (value[index]) {
          newValue[index] = '';
          setValue(newValue);
          trigger(newValue);
        } else if (prev) {
          newValue[prevIndex] = '';
          setValue(newValue);
          trigger(newValue);
          prev.focus();
        }

        break;
      }

      case KEY_CODE.DOWN:
      case KEY_CODE.LEFT: {
        event.preventDefault();

        if (prev) {
          prev.focus();
        }

        break;
      }

      case KEY_CODE.UP:
      case KEY_CODE.RIGHT: {
        event.preventDefault();

        if (next) {
          next.focus();
        }

        break;
      }
    }
  };

  const handleFocus = (event: any) => {
    event.target.select(event);
  }

  let autoFocusIndex = 0;

  if (valueProp && valueProp.length) {
    autoFocusIndex = valueProp.length >= fields ? 0 : valueProp.length;
  }

  return (
    <div className={classNames(styles.root, className)}>
      {value.map((value, index) => (
        <Input
          key={index}
          ref={(element: HTMLInputElement) => {
            $inputs.current[index] = element;
          }}
          className={styles.input}
          id={id}
          name={name}
          type={type === 'number' ? 'tel' : type}
          value={value}
          placeholder={placeholder[index]}
          autoFocus={autoFocus && index === autoFocusIndex}
          disabled={disabled}
          data-id={index}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
};

// Exports
export default CodeInput;
