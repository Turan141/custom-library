// Core
import React from 'react';

// Components
import { H5 } from '@components/Typography';
import { OptionProps } from '@components/MultiSelect/Option/Option';

// Styles
import styles from './Options.module.scss';

export interface OptGroupProps {
  onClick?: (value: string) => void;
  selectedValues?: string[]
  name?: string;
  register?: (value: string, label: string) => void;
}

const OptGroup: React.FC<OptGroupProps> = ({ children, selectedValues, name, onClick: onClickProp, register }) => {
  return (
    <div className={styles.group}>
      <H5 className={styles.groupTitle}> {name} </H5>
      {
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          const onClick = (value: string) => {
            child.props.onClick && child.props.onClick(value);
            onClickProp && onClickProp(value)
          }

          return React.cloneElement<OptionProps>(child, {
            onClick,
            selectedValues,
            register,
          })
        })
      }
    </div>
  )
};

// Exports
export default OptGroup;
