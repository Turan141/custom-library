// Core
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { Transition } from 'react-transition-group';

// Components
import InputBase from '@components/InputBase';
import Chip from '@components/MultiSelect/Chip';
import Scrollbar from '@components/Scrollbar';
import { Option, OptGroup, OptionProps } from './Option';
import type { OptionProps as MultiSelectOptionProps, OptGroupProps } from './Option'

// Styles
import styles from './MultiSelect.module.scss';

// Helpers
import { useDropdown } from '@helpers/useDropdown';
import withReduxForm from '@helpers/withReduxForm';
import Icon from "@components/Icons";

export interface MultiSelectProps {
  className?: string;
  id?: string;
  name?: string;
  value?: string[];
  label?: string;
  disableSelect?: boolean;
  error?: boolean | string | null;
  disabled?: boolean;
  prefix?: React.ReactNode;
  onChange?: (value: string[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selected?: Record<'value' | 'label', string>[];
  chipLabel?: string;
  placementStyle?: 'absolute' | 'fixed';
}

interface MultiSelectInterface extends React.FC<MultiSelectProps> {
  Redux: typeof MultiSelectRedux;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
}

const MultiSelect: MultiSelectInterface = ({
  value: valueProp,
  disabled,
  label,
  children,
  id,
  onChange,
  error,
  className,
  name,
  prefix,
  disableSelect,
  selected = [],
  chipLabel = 'label',
  placementStyle,
}) => {
  const $wrapper = React.useRef<HTMLDivElement>(null);
  const $registredOptions = React.useRef<Record<'value' | 'label', string>[]>([])
  const [selectedInner, setSelectedInner] = useState(selected);
  const [value, setValue] = React.useState<any[]>(valueProp || []);
  const checkIsnotDeletable = React.useCallback((id) => {
    const childs = children as Array<{ props: OptionProps }> || [];
    const ids = childs.filter(({ props }) => props.disabled).map(({ props }) => props.value);
    if (ids.includes(id)) {
      return true;
    }
    return false
  }, [children])
  const register = React.useCallback((value, label) => {
    if (!$registredOptions.current.some(option => option.value === value)) {
      const item: any = { value, label }
      $registredOptions.current.push(item);
      setValue(v => [...v])
      setSelectedInner([...selectedInner, item])
    }
  }, []);
  useEffect(() => {
    setSelectedInner(selected)
  }, [value])
  const {
    Dropdown,
    isOpen,
    open,
  } = useDropdown({
    ref: $wrapper,
    position: 'bottom left',
    placementStyle,
  });
  useEffect(() => {
    if (valueProp) setValue(valueProp)
  }, [valueProp])
  const width = React.useMemo(() => {
    if ($wrapper.current) {
      const rect = $wrapper.current.getBoundingClientRect();

      return rect.width;
    }
  }, [$wrapper.current?.offsetWidth]);

  const chevron = React.useMemo(() => (
    <span className={styles.chevron}>
      {isOpen ? <Icon name='angleUp' /> : <Icon name='angleDown' />}
    </span>
  ), [isOpen]);

  const handleSelect = React.useCallback((value: string) => {
    setValue(prevValue => {
      const newValue = prevValue.includes(value) ?
        prevValue.filter(val => val !== value) :
        [...prevValue, value];

      onChange && onChange(newValue)
      return newValue;
    });
  }, []);
  const handleDelete = (value: string) => {

    setValue(prevValue => {
      const newValue = prevValue.filter(val => val !== value);

      onChange && onChange(newValue);
      return newValue;
    });
  }
  return (
    <InputBase
      className={classNames(styles.root, className)}
      id={id}
      disabled={disabled}
      label={label}
      suffix={!disabled && !disableSelect && chevron}
      error={error}
      prefix={prefix}
      onClick={open}
      value={value.length}
      ref={$wrapper}
    >
      {() => (
        <>
          {/*TODO: трещ, шляпа, убрать*/}
          {$registredOptions.current.length === 0 &&
            <div className={styles.crunch}>
              {
                React.Children.map(children, (child) => {
                  if (!React.isValidElement(child)) {
                    return null;
                  }

                  const onClick = (value: string) => {
                    child.props.onClick && child.props.onClick();
                    handleSelect(value);
                  };

                  return React.cloneElement<MultiSelectOptionProps | OptGroupProps>(child, {
                    ...child.props,
                    onClick,
                    selectedValues: value,
                    register,
                  });
                })
              }
            </div>
          }
          <select
            value={value}
            multiple
            className={styles.select}
            id={id}
            name={name}
          />
          <div className={styles.chips}>
            {

              Boolean(selectedInner?.length) ? selectedInner
                .filter(option => value.includes(option.value))
                .map((option: any) => <Chip value={option.value} disabled={disabled} onRemove={handleDelete} label={option[chipLabel]} notDeletable={checkIsnotDeletable(option.value)} />) :
                $registredOptions.current
                  .filter(option => value.includes(option.value))
                  .map((option: any) => <Chip value={option.value} disabled={disabled} onRemove={handleDelete} label={option[chipLabel]} notDeletable={checkIsnotDeletable(option.value)} />)
            }
          </div>

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
            <Dropdown style={{ width, display: disableSelect ? 'none' : 'initial' }}>

              <ul className={styles.dropdown}>
                <Scrollbar>
                  {
                    React.Children.map(children, (child) => {
                      if (!React.isValidElement(child)) {
                        return null
                      }

                      const onClick = (value: string) => {
                        child.props.onClick && child.props.onClick();
                        handleSelect(value);
                      };

                      return React.cloneElement<MultiSelectOptionProps | OptGroupProps>(child, {
                        ...child.props,
                        onClick,
                        selectedValues: value,
                        register,
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

const MultiSelectRedux = withReduxForm(MultiSelect);

MultiSelect.Redux = MultiSelectRedux;
MultiSelect.Option = Option;
MultiSelect.OptGroup = OptGroup;

// Exports
export default MultiSelect;
