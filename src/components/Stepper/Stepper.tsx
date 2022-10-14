// Core
import React from 'react';
import cn from 'classnames';

// Styles
import styles from './Stepper.module.scss';

// Components
import { StepProps } from './Step';

interface StepperProps {
  className?: string;
  current: number;
  visited?: number[];
}

const Stepper: React.FC<StepperProps> = ({ current, visited, className, children }) => {
  const $visited = React.useRef<number[]>(visited || []);

  React.useEffect(() => {
    if (visited)
    $visited.current = visited;
  }, [visited])

  React.useEffect(() => {
    !$visited.current.includes(current) && $visited.current.push(current);
  }, [current]);

  return (
    <div className={cn(styles.root, className)}>
      {
        React.Children.map(children, (child, index) => {
          if (!React.isValidElement<StepProps>(child)) {
            return null;
          }

          const visited = $visited.current.includes(index + 1);
          const disabled = !visited && current < index + 1

          return (
            <>
              {
                index !== 0 && <div className={styles.dash} />
              }
              {
                React.cloneElement(child, {
                  ...child.props,
                  number: index + 1,
                  disabled,
                  editable: visited && current !== index + 1,
                })
              }
            </>
          );
        })
      }
    </div>
  );
};

// Exports
export default Stepper;
