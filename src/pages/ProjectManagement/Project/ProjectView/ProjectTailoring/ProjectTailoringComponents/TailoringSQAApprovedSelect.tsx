import React, { useMemo } from 'react'
import { CFormSelect } from '@coreui/react-pro'
import { TailoringSQAApprovedSelectOptions } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const TailoringSQAApprovedSelect = ({
  selectValue,
  selectChangeHandler,
  processHeadId,
  processSubHeadId,
}: {
  selectValue: string | null
  selectChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  const finalSelectValue = useMemo(() => {
    return selectValue
      ? selectValue
      : TailoringSQAApprovedSelectOptions.Approved
  }, [selectValue])

  return (
    <CFormSelect
      data-testid={`tailorSQASelect-${processHeadId}-${processSubHeadId}`}
      value={finalSelectValue}
      onChange={selectChangeHandler}
    >
      <option value={TailoringSQAApprovedSelectOptions.Approved}>
        {TailoringSQAApprovedSelectOptions.Approved}
      </option>
      <option value={TailoringSQAApprovedSelectOptions.Rejected}>
        {TailoringSQAApprovedSelectOptions.Rejected}
      </option>
    </CFormSelect>
  )
}

export default TailoringSQAApprovedSelect
