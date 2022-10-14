// Core
import * as React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Components
import Item from '@components/Menu/Item';

// Helpers
import { useDropdown, PositionType } from '@helpers/useDropdown';

// Utils
import { cloneReferencedElement } from '@utils/cloneReferencedElement';

// Styles
import styles from './Menu.module.scss';

const ActionTypes = ['click', 'hover'] as const;

export type ActionType = typeof ActionTypes[number];

export interface MenuProps {
    /**
     * Переданные дети отобразятся внутри меню
     */
    children: React.ReactNode;
    /**
     * className для конфигурации
     */
    className?: string;
    /**
     * элемент, который отрендерится
     */
    trigger: React.ReactNode;
    /**
     * расположение меню относительно триггера
     */
    position?: PositionType;
    /**
     * действие, которое открывает меню
     */
    action?: ActionType;
    /**
     * сдвиг по по оси x
     */
    offsetX?: number;
    /**
     * сдвиг по оси y
     */
    offsetY?: number;
    /**
     * задержка перед открытием меню
     */
    mouseEnterDelay?: number;
    /**
     * задержка перед закрытием меню
     */
    mouseLeaveDelay?: number;
}

export interface MenuInterface extends React.FC<MenuProps> {
    Item: typeof Item;
}

const Menu: MenuInterface = ({
    children,
    className,
    trigger,
    position = 'bottom left',
    action = 'click',
    offsetX = 0,
    offsetY = 0,
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0,
}) => {
    const $timeout = React.useRef<any>(null);
    const $trigger = React.useRef<any>(null);
    const $content = React.useRef<any>(null);

    const { Dropdown, isOpen, open, close } = useDropdown({
        ref: $trigger,
        position: position,
        offsetX: offsetX,
        offsetY: offsetY,
    });

    const handleMouseEnter = () => {
        clearTimeout($timeout.current);
        $timeout.current = setTimeout(open, mouseEnterDelay);
    };

    const handleMouseLeave = () => {
        clearTimeout($timeout.current);
        $timeout.current = setTimeout(close, mouseLeaveDelay);
    };

    const handleToggle = (e: Event) => {
        e.stopPropagation();
        isOpen ? close() : open();
    };

    React.useEffect(() => {
        return () => clearTimeout($timeout.current);
    }, [isOpen]);

    const timeout = 200;

    const renderTrigger = () => {
        let triggerProps: any = {
            ref: (element: any) => ($trigger.current = element),
        };

        const actions = Array.isArray(action) ? action : [action];

        actions.forEach((action) => {
            switch (action) {
                case 'click': {
                    triggerProps.onClick = handleToggle;
                    break;
                }

                case 'hover': {
                    triggerProps.onMouseEnter = handleMouseEnter;
                    triggerProps.onMouseLeave = handleMouseLeave;
                    break;
                }
            }
        });

        return cloneReferencedElement(trigger, { ...triggerProps });
    };

    const renderContent = () => {
        let contentProps: any = {};

        const actions = Array.isArray(action) ? action : [action];

        if (actions.indexOf('hover') !== -1) {
            contentProps.onMouseEnter = handleMouseEnter;
            contentProps.onMouseLeave = handleMouseLeave;
        }

        return (
            <ul
                {...contentProps}
                ref={$content}
                className={classNames(styles.root, className)}
            >
                {children}
            </ul>
        );
    };

    return (
        <>
            {renderTrigger()}

            <Transition
                in={isOpen}
                timeout={timeout}
                mountOnEnter
                unmountOnExit
                addEndListener={(node, done) => {
                    gsap.to(node, timeout / 1000, {
                        autoAlpha: isOpen ? 1 : 0,
                        y: isOpen ? 6 : 0,
                        onComplete: done,
                    });
                }}
            >
                <Dropdown>{renderContent()}</Dropdown>
            </Transition>
        </>
    );
};

Menu.Item = Item;

// Exports
export default Menu;
