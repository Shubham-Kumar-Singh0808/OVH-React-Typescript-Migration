import { CFormLabel, CButton } from '@coreui/react-pro'
import React from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { initialStatusReportFilters } from '../../../../reducers/Recruitment/InterviewStatusReport/InterviewStatusReportSliceConstants'
import { getInterviewStatusReportTestId } from '../InterviewStatusReportHelpers'

const FilterOptionsButtons = ({
  IsViewBtnEnabled,
  isClearBtnEnabled,
  setCurrentPage,
}: {
  IsViewBtnEnabled: boolean
  isClearBtnEnabled: boolean
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const finalFilterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )

  const viewButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.interviewStatusReport.getInterviewStatusReportThunk(
        finalFilterOptions,
      ),
    )
    setCurrentPage(1)
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.interviewStatusReport.actions.setFilterOptions(
        initialStatusReportFilters,
      ),
    )
    dispatch(
      reduxServices.interviewStatusReport.actions.setInterviewStatusReportList({
        list: [],
        size: 0,
      }),
    )
  }
  return (
    <div className="d-flex flex-row align-items-center justify-content-start mt-4">
      <CFormLabel className="col-sm-3"></CFormLabel>
      <CButton
        color="success"
        className="btn-ovh me-2"
        data-testid={getInterviewStatusReportTestId('viewBtn')}
        disabled={!IsViewBtnEnabled}
        onClick={viewButtonHandler}
      >
        View
      </CButton>
      <CButton
        color="warning"
        className="btn-ovh"
        data-testid={getInterviewStatusReportTestId('clearBtn')}
        onClick={clearButtonHandler}
        disabled={!isClearBtnEnabled}
      >
        Clear
      </CButton>
    </div>
  )
}

export default FilterOptionsButtons
