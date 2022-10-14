// Core
import React from 'react';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

// Styles
import styles from './Scrollbar.module.scss';

export interface ScrollbarProps {
    children?: React.ReactNode;
    className?: string;
    onScroll?: (event: React.UIEvent) => void;
}

const Scrollbar: React.FC<ScrollbarProps> = ({
    children,
    className,
    onScroll,
}) => {
    const $scrollableNode = React.useRef<any>(null);
    React.useEffect(() => {
        if (onScroll && $scrollableNode.current) {
            $scrollableNode.current.addEventListener('scroll', onScroll);
        }

        return () =>
            $scrollableNode.current &&
            $scrollableNode.current.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    return (
        <SimpleBar
            className={classNames(styles.root, className)}
            scrollableNodeProps={{ ref: $scrollableNode }}
        >
            {children}
        </SimpleBar>
    );
};

// Exports
export default React.memo(Scrollbar);
