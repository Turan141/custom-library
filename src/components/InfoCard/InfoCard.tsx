// Core
import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './InfoCard.module.scss';

const StatusColorTypes = ['success', 'warning', 'danger', 'info'] as const;

export type StatusColorType = typeof StatusColorTypes[number];

interface InfoCardProps {
  children?: React.ReactNode;
  className?: string;
  status?: StatusColorType;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, status, className }) => {
  const icon = React.useMemo(() => {
    switch (status) {
      case 'warning':
        return <i className="icon-warning" />;
      case 'danger':
        return <i className="icon-block-circle" />;

      default:
      case 'success':
        return <i className="icon-done-circle" />;
    }
  }, [status]);

  return (
    <div className={classNames(styles.root, styles[status!], className)}>
      <div className={styles.wrapper}>
        <span className={classNames(styles.icon, styles[`icon-${status}`])}>
          {icon}
        </span>

        {children}
      </div>
    </div>
  );
};

// Exports
export default InfoCard;
