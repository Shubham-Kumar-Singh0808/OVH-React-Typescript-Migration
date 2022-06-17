export type ModalPropsType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  alignment?: 'center' | 'top'
  modalTitle?: string
  children: JSX.Element | string
  modalHeaderClass?: string
  modalFooterClass?: string
  modalBodyClass?: string
  closeButtonClass?: string
  modalSize?: 'sm' | 'lg' | 'xl' | undefined
  isConfirmButtonDisabled?: boolean
  isCancelButtonDisabled?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonAction?: () => Promise<void>
}
