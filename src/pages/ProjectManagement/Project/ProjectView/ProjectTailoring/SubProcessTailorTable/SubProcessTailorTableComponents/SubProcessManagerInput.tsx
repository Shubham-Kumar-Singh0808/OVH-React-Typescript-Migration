import { CTableDataCell } from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import { reduxServices } from '../../../../../../../reducers/reduxServices'
import {
  useAppDispatch,
  useTypedSelector,
} from '../../../../../../../stateStore'
import {
  TailoringRequiredSelectOptions,
  UpdateProjectTailoringDataType,
  ProjectTailoringStatusEnum,
} from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import JustificationLengthError from '../../ProjectTailoringComponents/JustificationLengthError'
import TailoringJustification from '../../ProjectTailoringComponents/TailoringJustification'
import TailoringRequiredSelect from '../../ProjectTailoringComponents/TailoringRequiredSelect'

/* 
this component is used to render manager inputs. Initially when form is 
not submitted or the form is approved / rejected by sqa, manager can edit the form.
So this component is used to render manager input
*/

const SubProcessManagerInput = ({
  selectTailorValue,
  managerComments,
  processHeadId,
  processSubHeadId,
}: {
  selectTailorValue: string
  managerComments: string | null
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  /* 
    if manager has set tailoring required as yes/ waived off,
    then he/she must write justification of upto 50 characters
  */
  const showJustificationRequiredError = useMemo(() => {
    return (
      (selectTailorValue === TailoringRequiredSelectOptions.Yes.toString() ||
        selectTailorValue ===
          TailoringRequiredSelectOptions.WaivedOff.toString()) &&
      (managerComments === null || managerComments.trim().length < 50)
    )
  }, [managerComments, selectTailorValue])

  const sendManagerDataToRedux = (
    updateType: UpdateProjectTailoringDataType,
    value: string,
  ) => {
    if (
      tailorStatus === ProjectTailoringStatusEnum.saveForManager ||
      tailorStatus === ProjectTailoringStatusEnum.approved ||
      tailorStatus === ProjectTailoringStatusEnum.rejected
    ) {
      dispatch(
        reduxServices.projectTailoring.actions.updateSavedManagerEnteredData({
          processHeadId,
          processSubHeadId,
          value,
          updateType,
        }),
      )
    } else {
      dispatch(
        reduxServices.projectTailoring.actions.updateInitialManagerEnteredData({
          processHeadId,
          processSubHeadId,
          value,
          updateType,
        }),
      )
    }
  }

  const subProcessTailoringNeededChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    sendManagerDataToRedux(
      UpdateProjectTailoringDataType.Select,
      e.target.value,
    )
  }

  const subProcessTailorManagerJustificationChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    sendManagerDataToRedux(
      UpdateProjectTailoringDataType.Justification,
      e.target.value,
    )
  }

  return (
    <>
      <CTableDataCell>
        <TailoringRequiredSelect
          selectValue={selectTailorValue}
          selectChangeHandler={subProcessTailoringNeededChangeHandler}
          processHeadId={processHeadId}
          processSubHeadId={processSubHeadId}
        />
      </CTableDataCell>
      <CTableDataCell>
        <TailoringJustification
          enteredDescription={managerComments}
          descriptionChangeHandler={
            subProcessTailorManagerJustificationChangeHandler
          }
          processHeadId={processHeadId}
          processSubHeadId={processSubHeadId}
        />
        <JustificationLengthError
          showError={showJustificationRequiredError}
          length={50}
        />
      </CTableDataCell>
    </>
  )
}

export default SubProcessManagerInput
