import React, { useState } from 'react'

type UseModalReturnProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  modalDescription: string | JSX.Element
  setModalDescription: React.Dispatch<
    React.SetStateAction<string | JSX.Element>
  >
}

const useModal = ({
  displayModal,
  initialDescription,
}: {
  displayModal: boolean
  initialDescription: string | JSX.Element
}): UseModalReturnProps => {
  const [showModal, setShowModal] = useState<boolean>(displayModal)
  const [modalDescription, setModalDescription] = useState<
    string | JSX.Element
  >(initialDescription)

  return { showModal, setShowModal, modalDescription, setModalDescription }
}

export default useModal
