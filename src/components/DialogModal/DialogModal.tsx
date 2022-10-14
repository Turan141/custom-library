// Core
import React from 'react';
import cn from 'classnames';

// Components
import Modal from "@components/Modal";
import Button from "@components/Button";
import { H2 } from "@components/Typography";

// Helpers
import { useModal } from "@helpers/useModal";

// Styles
import styles from './DialogModal.module.scss';

interface DialogModalProps {
  title?: string;
  onCancel?: () => void;
  cancelButton?: React.ReactNode;
  okButton?: React.ReactNode;
  onOk?: () => void;
  extra?: React.ReactNode;
  className?: string;
}

const DialogModal: React.FC<DialogModalProps> = ({
  title,
  className,
  extra,
  onCancel,
  cancelButton,
  okButton,
  onOk,
  children
}) => {
  const { closeModal } = useModal()

  const handleApprove = React.useCallback(() => {
    closeModal();
    onOk && onOk();
  }, []);

  const handleCancel = React.useCallback(() => {
    closeModal();
    onCancel && onCancel();
  }, []);

  return (
    <Modal style={{width: 520, height: 236}}>
      <div className={cn(styles.root, className)}>
        <div className={styles.header}>
          <H2>{ title }</H2>
        </div>

        <div className={styles.body}>
          { children }
        </div>

        <div className={styles.footer}>
          {extra}

          <div className={styles.control}>
            { cancelButton ||
              <Button variant='text' onClick={handleCancel}>
                Отменить
              </Button>
            }

            { okButton ||
              <Button
                icon={<i className='icon-done' />}
                onClick={handleApprove}
              >
                Подтверидить
              </Button>
            }
          </div>
        </div>
      </div>
    </Modal>
  )
};

// Exports
export default DialogModal;
