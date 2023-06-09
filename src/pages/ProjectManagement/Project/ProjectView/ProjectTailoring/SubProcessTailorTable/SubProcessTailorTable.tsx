import React from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import SubProcessTailorTableRow from './SubProcessTailorTableRow'
import {
  ProcessSubHeadDTO,
  ProjectTailoringStatusEnum,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { sortSubProcessesInAscendingOrder } from '../ProjectTailoringHelpers'
import { useTypedSelector } from '../../../../../../stateStore'

const SubProcessTailorTable = ({
  subProcesses,
  processHeadId,
}: {
  subProcesses: ProcessSubHeadDTO[]
  processHeadId: number
}): JSX.Element => {
  const tailorStatus = useTypedSelector(
    (state) => state.projectTailoring.tailorStatus,
  )
  return (
    <CTable striped responsive align="middle">
      <CTableHead
        className="profile-tab-header"
        style={{ backgroundColor: '#1b5d95' }}
      >
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
          {tailorStatus !== ProjectTailoringStatusEnum.initial && (
            <>
              <CTableHeaderCell scope="col" className="profile-tab-content">
                SQA Approved
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="profile-tab-content">
                SQA Review
              </CTableHeaderCell>
            </>
          )}
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
