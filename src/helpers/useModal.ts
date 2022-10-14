import { useContext } from 'react';
import { ModalContext } from '@components/ModalProvider/ModalProvider';

export function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
}
