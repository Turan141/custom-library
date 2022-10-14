// Core
import * as React from 'react';
import { Portal } from 'react-portal';

// Utils
import { getPosition } from '@utils/position';
import { cloneReferencedElement } from '@utils/cloneReferencedElement';

const PositionTypes = [
  'top right',
  'top left',
  'right top',
  'right bottom',
  'bottom right',
  'bottom left',
  'left top',
  'left bottom',
] as const;

export type PositionType = typeof PositionTypes[number];

export interface Options {
  ref: React.RefObject<any>;
  position?: PositionType;
  onOpen?: () => void;
  onClose?: () => void;
  offsetX?: number;
  offsetY?: number;
  closeOnClickOutside?: boolean,
  placementStyle?: 'absolute' | 'fixed'
}

export interface DropdownProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface Return {
  Dropdown: React.FC<DropdownProps>,
  isOpen: boolean,
  open: () => void,
  close: () => void,
}

export const useDropdown = ({
  ref: $trigger,
  position = PositionTypes[0],
  onOpen,
  onClose,
  offsetX = 0,
  offsetY = 0,
  closeOnClickOutside = true,
  placementStyle = 'absolute'
}: Options): Return => {
  const $content = React.useRef<any>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const setPosition = () => {
    const trigger = $trigger.current?.getBoundingClientRect();
    const content = $content.current?.getBoundingClientRect();

    const cords = getPosition(trigger, content, position, offsetY, offsetX);

    $content.current.style.top = `${cords.top + window.scrollY}px`;
    $content.current.style.left = `${cords.left + window.scrollX}px`;
  };

  const open = () => {
    setIsOpen(true);
    onOpen && onOpen();
  };

  const close = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!closeOnClickOutside) {
      return;
    }

    if (
      $trigger.current.contains(event.target) ||
      $content.current.contains(event.target)
    ) {
      return;
    }

    close();
  };

  React.useEffect(() => {
    if (isOpen) {
      setPosition();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('resize', setPosition);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('resize', setPosition);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('resize', setPosition);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const Dropdown = React.useCallback(({ children, style }) => {
    const styles = style ?? {};

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      children.props.onClick && children.props.onClick(event);
    };

    const content = cloneReferencedElement(children, {
      ref: (element: any) => $content.current = element,
      onClick: handleClick,
      style: { ...styles, position: placementStyle },
    });

    return <Portal>{content}</Portal>;
  }, []);

  return { Dropdown, isOpen, open, close };
};
