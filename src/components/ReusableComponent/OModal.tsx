/* eslint-disable prettier/prettier */

import {
    CButton,
    CCloseButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
} from '@coreui/react-pro'

import React from 'react'

interface OModalPropsTypes {
    visible?: boolean;
    setVisible: ((value: boolean) => void);
    alignment?: "top" | "center";
    modalTitle?: string;
    children?: React.ReactNode;
    closeButtonClass?: string;
    modalHeaderClass?: string;
    modalFooterClass?: string;
    modalBodyClass?: string;
    isConfirmButtonDisabled?: boolean;
    isCancelButtonDisabled?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonAction?: () => void;
}
const OModal: React.FC<OModalPropsTypes> = ({
    visible,
    setVisible,
    alignment = 'center',
    modalTitle,
    children,
    closeButtonClass,
    modalHeaderClass,
    modalFooterClass,
    modalBodyClass,
    isConfirmButtonDisabled = false,
    isCancelButtonDisabled = false,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    confirmButtonAction, }: OModalPropsTypes) => {
    return (
        <>
            <CModal
                alignment={alignment}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}>
                <CModalHeader className={modalHeaderClass}>
                    {modalTitle && <strong>{modalTitle}</strong>}
                </CModalHeader>
                <CCloseButton className={`cursor-pointer ${closeButtonClass}`} onClick={() => {
                    setVisible(false)
                }} />
                <CModalBody className={modalBodyClass}>{children}</CModalBody>
                <CModalFooter className={modalFooterClass}>
                    <CButton
                        color="warning btn-ovh"
                        disabled={isConfirmButtonDisabled}
                        onClick={confirmButtonAction}>
                        {confirmButtonText}
                    </CButton>
                    <CButton
                        color="success btn-ovh"
                        disabled={isCancelButtonDisabled}
                        onClick={() => {
                            setVisible(false)
                        }}>
                        {cancelButtonText}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
export default OModal
