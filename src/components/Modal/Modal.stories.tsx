import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import Modal , { ModalProps } from './Modal';
import {ModalComponentProps} from "@components/ModalProvider";
import {useModal} from "@helpers/useModal";
import {ModalProvider} from "@components/index";
import Button from "@components/Button";

const ModalTemplate: React.FC<ModalComponentProps> = ({children, handleClose, isOpen}) => (
    <Modal isOpen={isOpen} onClose={handleClose}>
        {children}
    </Modal>
);

export default {
    title: 'Modal',
    component: Modal,
    parameters: {
        docs: {
            description: {
                component: 'Модальное окно. Для использования необходимо вызвать хук useModal - он вернёт openModal, в которую нужно прокинуть открываемую модалку, и, опционально данные, которые прийдут к последней в пропсы в пропсы. Пока демо не работает :('
            }
        }
    }
} as Meta;

const Template: Story<ModalProps> = (args) => {
    return (
        <ModalProvider>
            {(() => {
                const { openModal } = useModal();

                const handleClick = React.useCallback(() => {
                    openModal(ModalTemplate, args)
                }, []);
                return (
                    <Button onClick={handleClick}>Open Modal</Button>
                )
            })()}
        </ModalProvider>
    )
}

export const Base = Template.bind({});
Base.args = {children: 'Контент модалки'}