// Core
import React, { FormEvent } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Styles
import styles from './Select.module.scss';

//Helpers
import withReduxForm from '../../helpers/useDropdown';
import { useDropdown } from '../../helpers/useDropdown';

// Components
import InputBase from '../InputBase/InputBase';
import Scrollbar from '../Scrollbar/Scrollbar';
import Option from './Option';

// Types
import { SelectOptionProps } from './Option';

export interface SelectProps{
  className?: string;
  id?: string;
  name?: string;
  value?: number | string | null;
  label?: string;
  error?: boolean | string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange?: (value: string | number) => void;
  onInput?: (value: string) => void;
  onScroll?: (event: React.UIEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  clearable?: boolean;
  defaultDisplayValue?: string | number | null,
  placementStyle?: 'absolute' | 'fixed'
}

interface SelectType extends React.FC<SelectProps> {
  Redux: typeof SelectRedux;
  Option: typeof Option;
}

const Select: SelectType = ({
  className,
  id,
  name,
  value,
  label,
  error,
  autoFocus,
  disabled,
  prefix,
  suffix,
  onChange,
  children,
  onInput,
  onScroll,
  onOpen,
  onClose,
  clearable = true,
  defaultDisplayValue,
  placementStyle,
  ...props
}) => {
  const $input = React.useRef(null);
  const $wrapper = React.useRef<HTMLDivElement>(null);

  const [trueValue, setTrueValue] = React.useState<string | number | undefined | null>(value);

  const [displayValue, setDisplayValue] = React.useState<string | number>(defaultDisplayValue || '');

  const width = React.useMemo(() => {
    if ($wrapper.current) {
      const rect = $wrapper.current.getBoundingClientRect();

      return rect.width;
    }
  }, [$wrapper.current?.offsetWidth]);

  const {
    Dropdown,
    open,
    close,
    isOpen,
  } = useDropdown({
    ref: $wrapper,
    position: 'bottom left',
    offsetX: -10,
    onOpen,
    onClose,
    placementStyle
  });

  const chevron = React.useMemo(() => {
    const handleClick = () => {
      if (trueValue) {
        setTrueValue(null);
        handleInput('');
        onChange && onChange(null!);
      }
    }

    return (
      <span onClick={handleClick}>
      
      </span>
    );
  }, [isOpen, trueValue]);

  const handleSelect = (value: string | number, label: string) => {
    setTrueValue(value);
    setDisplayValue(label);
    onChange && onChange(value);
    close();
  }

  const handleInput = (value: string) => {
    setDisplayValue(value);
    onInput && onInput(value);
  }

  React.useEffect(() => {
    if (defaultDisplayValue) {
      setDisplayValue(defaultDisplayValue);
    }
  }, [defaultDisplayValue])

  React.useEffect(()=>{
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value === value) {
        setDisplayValue(child.props.label);
        setTrueValue(child.props.value);
      }
    })
  }, [children])

  React.useEffect(() => {
    if (!value) {
      setDisplayValue('');
      setTrueValue(null)
      return;
    }
  }, [value]);

  return (
    <InputBase
      className={classNames(styles.root, className)}
      id={id}
      value={displayValue}
      label={label}
      disabled={disabled}
      error={error}
      prefix={prefix}
      suffix={!disabled && clearable && chevron}
      onClick={open}
      ref={$wrapper}
    >
      {({handleBlur, handleFocus}) => (
        <>
          <input
            value={trueValue!}
            className={styles.select}
            name={name}
            id={id}
            {...props}
          />

          <input
            className={styles.input}
            value={displayValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={!onInput || !!trueValue}
            onChange={(event) => handleInput(event.currentTarget.value)}
            ref={$input}
          />

          <Transition
            in={isOpen}
            timeout={100}
            mountOnEnter
            unmountOnExit
            addEndListener={(node, done) => {
              gsap.to(node, 0.1, {
                autoAlpha: isOpen ? 1 : 0,
                y: isOpen ? 1 : 0,
                onComplete: done,
              });
            }}
          >
            <Dropdown style={{width}}>
              <ul className={styles.dropdown}>
                <Scrollbar onScroll={onScroll}>
                  {
                    React.Children.map(children, (child) => {
                      if (!React.isValidElement(child)) {
                        return null
                      }

                      const onClick = (value: string | number, label: string) => {
                        child.props.onClick && child.props.onClick();
                        handleSelect(value, label);
                      }

                      return React.cloneElement<SelectOptionProps>(child, {
                        onClick,
                        key: child.props.label + child.props.value,
                        selected: trueValue === child.props.value,
                      })
                    })
                  }
                </Scrollbar>
              </ul>
            </Dropdown>
          </Transition>
        </>
      )}
    </InputBase>
  )
};

const SelectRedux = withReduxForm(Select);

Select.Redux = SelectRedux;
Select.Option = Option;

// Exports
export default Select
