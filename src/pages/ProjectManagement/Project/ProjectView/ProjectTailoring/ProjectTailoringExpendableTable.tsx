import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectInvoicesEntryTable = (): JSX.Element => {
  const projectTailoring = useTypedSelector(
    reduxServices.projectTailoring.selectors.projectTailoring,
  )
  return (
    <>
      <CTable
        responsive
        striped
        className="mt-2 text-start profile-tab-table-size"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Process Area</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Responsible</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Tailoring needed(Y/N)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Justification</CTableHeaderCell>
            <CTableHeaderCell scope="col">SQA Approved</CTableHeaderCell>
            <CTableHeaderCell scope="col">SQA Review</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projectTailoring?.processHeaddto?.map((item, index) => {
            return (
              <CTableRow key={index}>
                {item.processSubHeadsDto.map((data, index) => {
                  return (
                    <>
                      <CTableDataCell scope="row"></CTableDataCell>
                      <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.processSubHeadName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.documentName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.responsible}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.specificToProject}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.comments || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.sqaApproval}
                      </CTableDataCell>
                      <CTableDataCell scope="row">{'N/A'}</CTableDataCell>
                    </>
                  )
                })}
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectInvoicesEntryTable
