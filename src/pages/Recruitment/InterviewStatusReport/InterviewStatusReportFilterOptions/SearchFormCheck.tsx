import { CFormCheck } from '@coreui/react-pro'
import React from 'react'
import { CandidateCheckBoxFilterEnum } from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

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
    />
  )
}

export default SearchFormCheck
