import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormTextarea,
  CButton,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScheduleVarianceEntryTable from './ScheduleVarianceEntryTable'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'

const AddScheduleVariance = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const [textArea, setTextArea] = useState<string>()
  const dispatch = useAppDispatch()
  const getProjectOverallScheduleVariance = useTypedSelector(
    reduxServices.scheduleVariance.selectors.projectOverallScheduleVariance,
  )
  const isLoading = useTypedSelector(
    reduxServices.scheduleVariance.selectors.isProjectScheduleVarianceLoading,
  )
  useEffect(() => {
    dispatch(
      reduxServices.scheduleVariance.getOverAllScheduleVariance(projectId),
    )
  }, [])
  return (
    <>
      <CTable striped responsive className="sh-project-report-details">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              BaseLine Start Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              BaseLine End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Actual/Projected Start Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Actual/Projected End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Status
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              SV in %
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Comments
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getProjectOverallScheduleVariance?.length > 0 &&
            getProjectOverallScheduleVariance?.map((projectSchedule, i) => {
              return (
                <CTableRow col-span={7} key={i}>
                  <CTableDataCell>{i + 1}</CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.baseLineStartDate}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.baseLineEndDate}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.overAllSheduleVariance}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormTextarea
                      placeholder="Purpose"
                      aria-label="textarea"
                      id="textArea"
                      name="textArea"
                      data-testid="text-area"
                      value={textArea}
                      onChange={(e) => setTextArea(e.target.value)}
                    ></CFormTextarea>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow className="mt-5 mb-4">
        <CCol md={{ span: 6, offset: 3 }}>
          <>
            <CButton
              className="btn-ovh me-1"
              data-testid="confirmBtn"
              color="success"
            >
              Submit
            </CButton>
          </>
        </CCol>
      </CRow>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <ScheduleVarianceEntryTable />
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default AddScheduleVariance
