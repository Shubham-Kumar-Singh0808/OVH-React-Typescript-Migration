import React from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import SubProcessTailorTableRow from './SubProcessTailorTableRow'
import { ProcessSubHeadDTO } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { sortSubProcessesInAscendingOrder } from '../ProjectTailoringHelpers'

const SubProcessTailorTable = ({
  subProcesses,
  processHeadId,
}: {
  subProcesses: ProcessSubHeadDTO[]
  processHeadId: number
}): JSX.Element => {
  return (
    <CTable striped responsive align="middle">
      <CTableHead className="profile-tab-header">
        <CTableRow>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            #
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Process Area
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Document Name
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Responsible
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Tailoring Needed(Y/N)
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Justification
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            SQA Approved
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            SQA Review
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {sortSubProcessesInAscendingOrder(subProcesses)?.map(
          (subProcess, subProcessIndex) => (
            <SubProcessTailorTableRow
              key={subProcessIndex}
              subProcess={subProcess}
              processHeadId={processHeadId}
              subProcessIndex={subProcessIndex}
            />
          ),
        )}
      </CTableBody>
    </CTable>
  )
}

export default SubProcessTailorTable
