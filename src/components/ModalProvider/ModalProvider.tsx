import React, { ReactNode, useCallback, useState } from 'react';

export interface ModalComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

export const ModalContext = React.createContext<{
  openModal: (modal: React.FC<any>, modalProps?: any) => void;
  closeModal: () => void;
}>({
  openModal: () => {},
  closeModal: () => {},
});

type ModalProviderState = {
  modal: React.FC | null;
  isOpen: boolean;
  modalProps: any;
};

const initialState = {
  modal: null,
  isOpen: false,
  modalProps: null,
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalProviderState>(initialState);
  const Component = state.modal ? state.modal : null;
  const openModal = useCallback(
    (modal: React.FC<any>, modalProps: any = {}) => {
      setState({
        modal,
        isOpen: true,
        modalProps,
      });
    },
    [setState]
  );

  const closeModal = useCallback(() => {
    setState(initialState);
  }, [setState]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {state.isOpen && Component && (
        <Component
          isOpen={state.isOpen}
          handleClose={closeModal}
          {...state.modalProps}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
