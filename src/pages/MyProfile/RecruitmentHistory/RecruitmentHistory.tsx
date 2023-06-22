import { CCardHeader } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import RecruitmentHistoryTimeline from './RecruitmentHistoryTimeline'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const RecruitmentHistory = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()

  const recruitmentHistoryData = useTypedSelector(
    (state) => state.recruitmentHistory.recruitmentHistoryData,
  )
  const isLoading = useTypedSelector(
    (state) => state.recruitmentHistory.isLoading,
  )

  useEffect(() => {
    if (isViewingAnotherEmployee && selectedEmployeeId) {
      dispatch(
        reduxServices.recruitmentHistory.getEmployeeHistoryThunk(
          +selectedEmployeeId,
        ),
      )
    }
  }, [selectedEmployeeId])

  const resumeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const resumePath = recruitmentHistoryData.resumePath
      ? recruitmentHistoryData.resumePath
      : undefined
    window.open(`https://ovh2.raybiztech.com/documents/${resumePath}`, '_blank')
  }

  return (
    <>
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CCardHeader>
            <h4 className="h4">History</h4>
          </CCardHeader>
          <RecruitmentHistoryTimeline
            timelineData={recruitmentHistoryData}
            resumeButtonHandler={resumeButtonHandler}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default RecruitmentHistory
