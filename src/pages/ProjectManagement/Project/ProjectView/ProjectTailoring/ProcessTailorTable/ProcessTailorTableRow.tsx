import React from 'react'
import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import { ProcessTailorTableRowProps } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { processedString } from '../ProjectTailoringHelpers'
import SubProcessTailorTable from '../SubProcessTailorTable/SubProcessTailorTable'

// this is each row of the process. the sub process table component will be added here

const ProcessTailorTableRow = ({
  thisProcess,
  thisProcessIndex,
  currentOpenedSubProcess,
  showSubProcessButtonHandler,
  hideSubProcessButtonHandler,
}: ProcessTailorTableRowProps): JSX.Element => {
  return (
    <>
      <CTableRow data-testid="processHeadRow">
        <CTableDataCell>
          {currentOpenedSubProcess.processHeadId ===
          thisProcess.processHeadId ? (
            <i
              data-testid={`minus-btn-${thisProcess.processHeadId}`}
              className="fa fa-minus-circle cursor-pointer"
              onClick={(e) => {
                hideSubProcessButtonHandler(e) //this is used to hide the sub process
              }}
            />
          ) : (
            <i
              data-testid={`plus-btn-${thisProcess.processHeadId}`}
              className="fa fa-plus-circle cursor-pointer"
              onClick={(e) => {
                //used to show the processes
                showSubProcessButtonHandler(e, {
                  processHeadId: thisProcess.processHeadId,
                  processIndex: thisProcessIndex,
                })
              }}
            />
          )}
        </CTableDataCell>
        <CTableDataCell
          data-testid={`processHeadName-${thisProcess.processHeadId}`}
        >
          {thisProcess.processHeadname}
        </CTableDataCell>
        <CTableDataCell
          data-testid={`processSubHeadCount-${thisProcess.processHeadId}`}
        >
          {thisProcess.processSubHeadCount}
        </CTableDataCell>
        <CTableDataCell
          data-testid={`processDocCount-${thisProcess.processHeadId}`}
        >
          {thisProcess.documentCount}
        </CTableDataCell>
        <CTableDataCell
          data-testid={`processTailoredCount-${thisProcess.processHeadId}`}
        >
          {processedString(thisProcess.tailoredCount)}
        </CTableDataCell>
        <CTableDataCell
          data-testid={`processWaivedCount-${thisProcess.processHeadId}`}
        >
          {thisProcess.waivedCount || '0'}
        </CTableDataCell>
      </CTableRow>
      {currentOpenedSubProcess.processHeadId === thisProcess.processHeadId && (
        <CTableRow data-testid={`allSubProcesses-${thisProcess.processHeadId}`}>
          <CTableDataCell colSpan={8} style={{ backgroundColor: '#fff' }}>
            <SubProcessTailorTable
              subProcesses={thisProcess.processSubHeadsDto}
              processHeadId={thisProcess.processHeadId}
            />
          </CTableDataCell>
        </CTableRow>
      )}
    </>
  )
}

export default ProcessTailorTableRow
