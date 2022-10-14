// Core
import React from 'react';
import cn from 'classnames';

// Styles
import styles from './Step.module.scss';

// Components
import { H5, P } from '@components/Typography';

export interface StepProps {
  className?: string;
  number?: number;
  label: string;
  disabled?: boolean;
  editable?: boolean;
  error?: string;
  onClick?: () => void;
}

const Step: React.FC<StepProps> = ({
  number,
  label,
  error,
  disabled,
  editable,
  className,
  onClick,
}) => {
  const handleClick = React.useCallback(() => {
    !disabled && onClick && onClick();
  }, [disabled]);

  return (
    <div
      className={cn(styles.root, className)}
      onClick={handleClick}
    >
      <span
        className={cn(
          styles.step,
          {
            [styles.error]: !disabled && !!error,
            [styles.disabled]: disabled
          },
        )}
      >
        {
          error? <i className='icon-warning' /> :
          editable? <i className='icon-edit' /> : number
        }
      </span>

      <div className={cn(styles.label, {
        [styles.disabled]: disabled
      })}>
        <H5>
          {label}
        </H5>

        {error &&
          <P size='small' className={styles.error}>
            {error}
          </P>
        }
      </div>
    </div>
  )
};

// Exports
export default Step;

