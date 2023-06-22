import { CFormCheck } from '@coreui/react-pro'
import React from 'react'
import { CandidateCheckBoxFilterEnum } from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { getInterviewStatusReportTestId } from '../InterviewStatusReportHelpers'

const SearchFormCheck = ({
  label,
  isChecked,
}: {
  label: CandidateCheckBoxFilterEnum
  isChecked: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const checkChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setSearchCheckBox({
        checkType: label,
        value: e.target.checked,
      }),
    )
  }

  return (
    <CFormCheck
      label={label}
      hitArea="full"
      checked={isChecked}
      onChange={checkChangeHandler}
      data-testid={getInterviewStatusReportTestId(label.toString())}
    />
  )
}

export default SearchFormCheck
