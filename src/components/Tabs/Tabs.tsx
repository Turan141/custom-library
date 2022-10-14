// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Tab from './Tab';
import Panel from './Pannel';

// Styles
import styles from './Tabs.module.scss';

export interface TabsProps {
    className?: string;
    onChange: (val: number) => void;
    value: number;
}

export interface TabsInterface extends React.FC<TabsProps> {
    Tab: typeof Tab;
    Panel: typeof Panel;
}

const Tabs: TabsInterface = ({
    children: childrenProp,
    className,
    onChange: onChangeProp,
    value,
}) => {
    const $tabs = React.useRef<HTMLDivElement>(null);

    const [indicatorWidth, setIndicatorWidth] = React.useState<number>(0);
    const [indicatorLeft, setIndicatorLeft] = React.useState<number>(0);

    const valueToIndex = new Map<number, number>();

    const getSelectedMeta = () => {
        if (!$tabs.current || !value || !$tabs.current.children) {
            return;
        }

        const selected = $tabs.current.children[valueToIndex.get(value)!];

        return selected && selected.getBoundingClientRect();
    };

    const updateIndicator = (): void => {
        const selectedRect = getSelectedMeta();

        if ($tabs.current && selectedRect) {
            const correction = $tabs.current.getBoundingClientRect().left;
            const position = selectedRect.left - correction;

            setIndicatorWidth(selectedRect.width - 2);
            setIndicatorLeft(position);
        } else {
            setIndicatorWidth(0);
            setIndicatorLeft(0);
        }
    };

    const onChange = (val: number) => {
        onChangeProp(val);
    };

    const children = React.Children.map(childrenProp, (child, index) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const childValue = child.props.value ?? index;

        valueToIndex.set(childValue, index);

        return React.cloneElement(child, {
            ...child.props,
            onChange,
            selected: childValue === value,
        });
    });

    React.useEffect(() => {
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [value]);

    React.useEffect(() => {
        updateIndicator();
    }, [value]);

    return (
        <div className={classNames(styles.tabs, className)}>
            <div ref={$tabs} className={styles.tabsInner}>
                {children}
            </div>
            <span
                className={styles.indicator}
                style={{ width: indicatorWidth, left: indicatorLeft }}
            />
        </div>
    );
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

// Exports
export default Tabs;
