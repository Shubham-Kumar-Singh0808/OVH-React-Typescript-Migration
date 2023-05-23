import { useState } from 'react'

const useModal = ({
  displayModal,
  initialDescription,
}: {
  displayModal: boolean
  initialDescription: string | JSX.Element
}) => {
  const [showModal, setShowModal] = useState<boolean>(displayModal)
  const [modalDescription, setModalDescription] = useState<
    string | JSX.Element
  >(initialDescription)

  return { showModal, setShowModal, modalDescription, setModalDescription }
}

export default useModal
