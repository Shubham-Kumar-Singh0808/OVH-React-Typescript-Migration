import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react-pro'

import { ModalPropsType } from '../../types/Components/modalTypes'
import React from 'react'

const OModal = ({
  visible,
  setVisible,
  alignment = 'center',
  modalTitle,
  children,
  modalHeaderClass,
  modalFooterClass,
  modalBodyClass,
  isConfirmButtonDisabled = false,
  isCancelButtonDisabled = false,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonAction,
}: ModalPropsType): JSX.Element => {
  return (
    <>
      <CModal
        alignment={alignment}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      >
        <CModalHeader className={modalHeaderClass}>
          {modalTitle && <strong>{modalTitle}</strong>}
        </CModalHeader>

        <CModalBody className={modalBodyClass}>{children}</CModalBody>
        <CModalFooter className={modalFooterClass}>
          <CButton
            color="warning btn-ovh"
            disabled={isConfirmButtonDisabled}
            onClick={confirmButtonAction}
          >
            {confirmButtonText}
          </CButton>
          <CButton
            color="success btn-ovh"
            disabled={isCancelButtonDisabled}
            onClick={() => {
              setVisible(false)
            }}
          >
            {cancelButtonText}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default OModal
