import { CButton, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import { getInterviewStatusReportTestId } from '../InterviewStatusReportHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  ExportInterviewStatusReportParams,
  ExportInterviewerDetailsParams,
} from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ExportButtons = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )

  const finalDateValue = (date: string | null): string | undefined => {
    return date ? date : undefined
  }

  const exportInterviewStatusReportBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: ExportInterviewStatusReportParams = {
      candidateStatus: filterOptions.candidateStatus,
      selectionStatus: filterOptions.selectionStatus,
      selectionTechnology: filterOptions.selectionTechnology,
      fromDate: finalDateValue(filterOptions.fromDate),
      toDate: finalDateValue(filterOptions.toDate),
      searchByCandidateName: filterOptions.searchByCandidateName,
      searchByMultipleFlag: filterOptions.searchByMultipleFlag,
      searchByRecruiterName: filterOptions.searchByRecruiterName,
      searchBySourceName: filterOptions.searchBySourceName,
    }
    dispatch(
      reduxServices.interviewStatusReport.exportInterviewStatusReportThunk(
        finalData,
      ),
    )
  }

  const exportInterviewerDetailsBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const finalData: ExportInterviewerDetailsParams = {
      fromDate: finalDateValue(filterOptions.fromDate),
      toDate: finalDateValue(filterOptions.toDate),
      selectionStatus: filterOptions.selectionStatus,
    }
    dispatch(
      reduxServices.interviewStatusReport.exportInterviewerDetailsThunk(
        finalData,
      ),
    )
  }

  return (
    <div className="my-2 ms-2">
      <CRow>
        <CCol sm={3}>
          <CButton
            color="info"
            className="btn-ovh"
            data-testid={getInterviewStatusReportTestId('exportBtn')}
            onClick={exportInterviewStatusReportBtnHandler}
          >
            <i className="fa fa-plus me-1"></i>
            Click To Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="justify-content-end text-end">
        <CCol sm={4}>
          <CButton
            color="info"
            className="btn-ovh"
            onClick={exportInterviewerDetailsBtnHandler}
            data-testid={getInterviewStatusReportTestId(
              'exportInterviewerListBtn',
            )}
          >
            <i className="fa fa-plus me-1"></i>
            Click To Export Interviewer List
          </CButton>
        </CCol>
      </CRow>
    </div>
  )
}

export default ExportButtons
