import { CButton, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import { AxiosError } from 'axios'
import { getInterviewStatusReportTestId } from '../InterviewStatusReportHelpers'
import {
  ExportInterviewStatusReportParams,
  ExportInterviewerDetailsParams,
} from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { useTypedSelector } from '../../../../stateStore'
import interviewStatusReportApi from '../../../../middleware/api/Recruitment/InterviewStatusReport/InterviewStatusReportApi'
import { downloadFile } from '../../../../utils/helper'

const ExportButtons = (): JSX.Element => {
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )

  const finalDateValue = (date: string | null): string => {
    return date ? date : 'undefined'
  }

  const exportInterviewStatusReportBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    try {
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
      const responseFile =
        await interviewStatusReportApi.exportInterviewStatusReport(finalData)
      downloadFile(responseFile, 'InterviewStatusReport.csv')
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.status)
    }
  }

  const exportInterviewerDetailsBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    try {
      const finalData: ExportInterviewerDetailsParams = {
        fromDate: finalDateValue(filterOptions.fromDate),
        toDate: finalDateValue(filterOptions.toDate),
        selectionStatus: filterOptions.selectionStatus,
      }
      const responseFile =
        await interviewStatusReportApi.exportInterviewerDetails(finalData)
      downloadFile(responseFile, 'InterviewerDetails.csv')
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.status)
    }
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
