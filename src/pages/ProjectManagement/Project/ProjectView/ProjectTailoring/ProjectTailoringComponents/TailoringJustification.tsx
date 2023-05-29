import { CFormTextarea } from '@coreui/react-pro'
import React from 'react'
import { getProcessedDescription } from '../ProjectTailoringHelpers'

const TailoringJustification = ({
  enteredDescription,
  descriptionChangeHandler,
  processHeadId,
  processSubHeadId,
}: {
  enteredDescription: string | null
  descriptionChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  return (
    <CFormTextarea
      data-testid={`tailorDescription-${processHeadId}-${processSubHeadId}`}
      value={getProcessedDescription(enteredDescription)}
      onChange={descriptionChangeHandler}
    />
  )
}

export default TailoringJustification
