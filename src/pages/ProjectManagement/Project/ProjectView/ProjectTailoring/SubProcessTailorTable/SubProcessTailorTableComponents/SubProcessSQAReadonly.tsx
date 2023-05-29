import { CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import { ProjectTailoringStatusEnum } from '../../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import { processedString } from '../../ProjectTailoringHelpers'

const SubProcessSQAReadonly = ({
  sqaApproval,
  sqaComments,
  processHeadId,
  processSubHeadId,
}: {
  sqaApproval: string | null
  sqaComments: string | null
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  return (
    <>
      <CTableDataCell
        data-testid={`sqaAppText-${processHeadId}-${processSubHeadId}`}
      >
        {sqaApproval === ProjectTailoringStatusEnum.rejected ? (
          <span
            style={{
              backgroundColor: 'red',
              color: 'white',
              paddingRight: '0.2rem',
              paddingLeft: '0.2rem',
            }}
          >
            {sqaApproval}
          </span>
        ) : (
          sqaApproval
        )}
      </CTableDataCell>
      <CTableDataCell
        data-testid={`sqaJustText-${processHeadId}-${processSubHeadId}`}
      >
        {processedString(sqaComments)}
      </CTableDataCell>
    </>
  )
}

export default SubProcessSQAReadonly
