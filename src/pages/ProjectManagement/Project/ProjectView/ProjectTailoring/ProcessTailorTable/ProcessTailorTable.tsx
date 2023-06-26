import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
} from '@coreui/react-pro'
import ProcessTailorTableRow from '../ProcessTailorTable/ProcessTailorTableRow'
import {
  ProcessHeadDTO,
  ShowHideSubProcessesProps,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { initialShowHideSubProcesses } from '../ProjectTailoringHelpers'

const ProcessTailorTable = ({
  displayedData,
}: {
  displayedData: ProcessHeadDTO[]
}): JSX.Element => {
  const [currentOpenedSubProcess, setCurrentOpenedSubProcess] =
    useState<ShowHideSubProcessesProps>(initialShowHideSubProcesses)

  // used to expand and show the sub processes under a process
  const showSubProcessButtonHandler = (
    e: React.MouseEvent<HTMLElement>,
    processData: ShowHideSubProcessesProps,
  ) => {
    e.preventDefault()
    setCurrentOpenedSubProcess(processData)
  }

  // used to minimize the currently show sub processes
  const hideSubProcessButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setCurrentOpenedSubProcess(initialShowHideSubProcesses)
  }

  return (
    <CTable striped responsive>
      <CTableHead
        className="profile-tab-header"
        style={{ backgroundColor: '#1b5d95' }}
      >
        <CTableRow>
          <CTableHeaderCell
            scope="col"
            className="profile-tab-content"
          ></CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Category
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Process Areas
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Documents
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            No. of Documents Tailored
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            No. of Documents Waived off
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody color="light">
        {displayedData?.map((process, processIndex) => (
          <ProcessTailorTableRow
            key={processIndex}
            thisProcess={process}
            thisProcessIndex={processIndex}
            currentOpenedSubProcess={currentOpenedSubProcess}
            showSubProcessButtonHandler={showSubProcessButtonHandler}
            hideSubProcessButtonHandler={hideSubProcessButtonHandler}
          />
        ))}
      </CTableBody>
    </CTable>
  )
}

export default ProcessTailorTable
