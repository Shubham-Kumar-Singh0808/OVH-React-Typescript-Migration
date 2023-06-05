import { CButton, CFormLabel, CFormTextarea } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../../../../stateStore'
import { getSaveProjectTailoringDocumentFinalData } from '../ProjectTailoringHelpers'
import {
  OutgoingSaveProjectTailoringDocumentInitial,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import OModal from '../../../../../../components/ReusableComponent/OModal'
import useModal from '../../../../../../middleware/hooks/useModal'
import { TextDanger } from '../../../../../../constant/ClassName'

// these are buttons for sqa to either approve or to reject the tailored document

const SQAButtons = ({
  submitDocumentHandler,
}: {
  submitDocumentHandler: (
    finalData: OutgoingSaveProjectTailoringDocumentInitial,
  ) => Promise<void>
}): JSX.Element => {
  const projectTailoringDocument = useTypedSelector(
    (state) => state.projectTailoring.projectTailoringDocument,
  )
  const isApproveButtonEnabled = useTypedSelector(
    (state) => state.projectTailoring.isSQAApproveButtonEnabled,
  )
  const isRejectButtonEnabled = useTypedSelector(
    (state) => state.projectTailoring.isSQARejectedButtonEnabled,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const [rejectComments, setRejectComments] = useState<string>('')
  const [isModalBtnEnabled, setIsModalBtnEnabled] = useState<boolean>(false)

  const rejectCommentsChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setRejectComments(e.target.value)
  }

  const { showModal, setShowModal } = useModal({
    displayModal: false,
    initialDescription: '',
  })

  const approveButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (typeof projectTailoringDocument !== 'string') {
      const finalData = getSaveProjectTailoringDocumentFinalData(
        projectTailoringDocument.processHeaddto,
        projectId,
        ProjectTailoringStatusEnum.approved,
        projectTailoringDocument.id,
      )
      finalData.rejectComments = rejectComments
      submitDocumentHandler(finalData)
    }
  }

  const modalRejectButtonHandler = () => {
    if (typeof projectTailoringDocument !== 'string') {
      const finalData = getSaveProjectTailoringDocumentFinalData(
        projectTailoringDocument.processHeaddto,
        projectId,
        ProjectTailoringStatusEnum.rejected,
        projectTailoringDocument.id,
      )
      submitDocumentHandler(finalData)
      setShowModal(false)
    }
  }

  const rejectButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowModal(true)
  }

  // logic to enable button in the modal
  useEffect(() => {
    if (rejectComments.trim().length > 0) {
      setIsModalBtnEnabled(true)
    } else {
      setIsModalBtnEnabled(false)
    }
  }, [rejectComments])

  return (
    <>
      <CButton
        color="success"
        className="btn-ovh me-2"
        onClick={approveButtonHandler}
        data-testid="approveBtn-SQA"
        disabled={!isApproveButtonEnabled}
      >
        Approve
      </CButton>
      <CButton
        color="danger"
        className="btn-ovh"
        onClick={rejectButtonHandler}
        data-testid="rejectBtn-SQA"
        disabled={!isRejectButtonEnabled}
      >
        Reject
      </CButton>
      <OModal
        visible={showModal}
        setVisible={setShowModal}
        modalHeaderClass="d-none"
        confirmButtonText="Submit"
        confirmButtonAction={modalRejectButtonHandler}
        isConfirmButtonDisabled={!isModalBtnEnabled}
      >
        <>
          <CFormLabel>
            Reason for Rejecting: <span className={TextDanger}>*</span>
          </CFormLabel>
          <CFormTextarea
            onChange={rejectCommentsChangeHandler}
            value={rejectComments}
            data-testid="rejectComments-textArea"
          />
        </>
      </OModal>
    </>
  )
}

export default SQAButtons
