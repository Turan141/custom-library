// Core
import React from 'react';
import cn from "classnames";

// Styles
import styles from './Icon.module.scss';

const IconBase: React.FC<{className?: string}> = ({ children, className }) => (
    <span className={cn(styles.iconBase, className)}>
        { children }
    </span>
);

// Exports
export default IconBase;
