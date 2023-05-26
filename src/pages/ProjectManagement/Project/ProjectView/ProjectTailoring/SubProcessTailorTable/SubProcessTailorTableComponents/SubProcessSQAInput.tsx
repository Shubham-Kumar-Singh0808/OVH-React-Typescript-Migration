import { CTableDataCell } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import TailoringJustification from '../../ProjectTailoringComponents/TailoringJustification'
import TailoringSQAApprovedSelect from '../../ProjectTailoringComponents/TailoringSQAApprovedSelect'
import { useAppDispatch } from '../../../../../../../stateStore'
import { reduxServices } from '../../../../../../../reducers/reduxServices'
import {
  TailoringSQAApprovedSelectOptions,
  UpdateProjectTailoringDataType,
} from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import JustificationLengthError from '../../ProjectTailoringComponents/JustificationLengthError'

// this is for sqa input.. SQA resources can select and write data using because of this component

const SubProcessSQAInput = ({
  selectSQAStatus,
  sqaComments,
  processHeadId,
  processSubHeadId,
}: {
  selectSQAStatus: string | null
  sqaComments: string | null
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  /* 
    if sqa has set status as rejected,
    then he/she must write justification of upto 50 characters
  */
  const showJustificationRequiredError = useMemo(() => {
    return (
      selectSQAStatus ===
        TailoringSQAApprovedSelectOptions.Rejected.toString() &&
      (sqaComments === null || sqaComments.trim().length < 10)
    )
  }, [sqaComments, selectSQAStatus])

  const sendSQADataToRedux = (
    updateType: UpdateProjectTailoringDataType,
    value: string,
  ) => {
    dispatch(
      reduxServices.projectTailoring.actions.updateSQAEnteredData({
        processHeadId,
        processSubHeadId,
        value,
        updateType,
      }),
    )
  }

  const subProcessSQATailorStatusChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    sendSQADataToRedux(UpdateProjectTailoringDataType.Select, e.target.value)
  }

  const subProcessSQAJustificationChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    sendSQADataToRedux(
      UpdateProjectTailoringDataType.Justification,
      e.target.value,
    )
  }

  return (
    <>
      <CTableDataCell>
        <TailoringSQAApprovedSelect
          selectValue={selectSQAStatus}
          selectChangeHandler={subProcessSQATailorStatusChangeHandler}
          processHeadId={processHeadId}
          processSubHeadId={processSubHeadId}
        />
      </CTableDataCell>
      <CTableDataCell>
        <TailoringJustification
          enteredDescription={sqaComments}
          descriptionChangeHandler={subProcessSQAJustificationChangeHandler}
          processHeadId={processHeadId}
          processSubHeadId={processSubHeadId}
        />
        <JustificationLengthError
          showError={showJustificationRequiredError}
          length={10}
        />
      </CTableDataCell>
    </>
  )
}

export default SubProcessSQAInput
