import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    active?: boolean;
    isClosable?: boolean;
    isBlank?: boolean;

    onClose?: Function;
}

const Modal = ({ children, active, onClose, isClosable, isBlank }: Props) => (
    <div
        className={`modal ${active ? "modal--active" : ""}`}
        onClick={e => e.target === e.currentTarget && isClosable && onClose && onClose()}
    >
        <div
            className={`modal__window ${active ? "modal__window--active" : ""} ${
                isBlank ? "modal__window--blank" : ""
            }`}
        >
            {children}
        </div>
    </div>
);

export default Modal;
