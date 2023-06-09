import { CCardBody, CCardHeader, CLink } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import MyProfileSeparationTimeline from './SeparationTimeline'
import SeparationEmployeeDetailItem from './SeparationEmployeeDetailItem'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const Separation = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()

  const employeeSeparationData = useTypedSelector(
    (state) => state.Separation.employeeSeparationData,
  )
  const isLoading = useTypedSelector((state) => state.Separation.isLoading)

  useEffect(() => {
    if (isViewingAnotherEmployee && selectedEmployeeId) {
      dispatch(
        reduxServices.Separation.getEmployeeSeparationFormThunk(
          +selectedEmployeeId,
        ),
      )
    }
  }, [selectedEmployeeId])

  const dueNotDueData = (data: string | null): string => {
    return data ? data : 'No Due'
  }

  const getFinalDownloadLink = (path: string) => {
    return `/hrm-ws/downloadForm?fileName=${path}&token=${localStorage.getItem(
      'token',
    )}&tenantKey=${localStorage.getItem('tenantKey')}`
  }

  const downloadFileHandler = (path: string) => {
    location.href = getFinalDownloadLink(path)
  }

  return (
    <>
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          {employeeSeparationData.separationComments.length > 0 ? (
            <>
              <CCardHeader>
                <h4 className="h4">Separation</h4>
              </CCardHeader>
              <CCardBody>
                <div>
                  <SeparationEmployeeDetailItem label="Employee Name">
                    {employeeSeparationData.employeeName}
                  </SeparationEmployeeDetailItem>
                  <SeparationEmployeeDetailItem label="IT">
                    {dueNotDueData(employeeSeparationData.itCcCss)}
                  </SeparationEmployeeDetailItem>
                  <SeparationEmployeeDetailItem label="HR">
                    {dueNotDueData(employeeSeparationData.hrCcCss)}
                  </SeparationEmployeeDetailItem>
                  <SeparationEmployeeDetailItem label="Manager">
                    {dueNotDueData(employeeSeparationData.managerCcCss)}
                  </SeparationEmployeeDetailItem>
                  <SeparationEmployeeDetailItem label="Exit Feedback Form">
                    <CLink
                      onClick={() =>
                        downloadFileHandler(
                          employeeSeparationData.exitFeedbackFormPath,
                        )
                      }
                    >
                      <i className="fa fa-paperclip ng-scope"></i>
                      Exit Feedback Form
                    </CLink>
                  </SeparationEmployeeDetailItem>
                  <SeparationEmployeeDetailItem label="Relieving Letter">
                    <CLink
                      onClick={() =>
                        downloadFileHandler(
                          employeeSeparationData.relievingLetterPath,
                        )
                      }
                    >
                      <i className="fa fa-paperclip ng-scope"></i>
                      Relieving Letter
                    </CLink>
                  </SeparationEmployeeDetailItem>
                </div>
                <MyProfileSeparationTimeline
                  separationComments={
                    employeeSeparationData?.separationComments
                  }
                />
              </CCardBody>
            </>
          ) : (
            <p style={{ fontWeight: 'bold' }} className="mt-2">
              No Records Found...
            </p>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Separation
