import React from 'react'
import { CFormSelect } from '@coreui/react-pro'
import { TailoringRequiredSelectOptions } from '../../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const TailoringRequiredSelect = ({
  selectValue,
  selectChangeHandler,
  processHeadId,
  processSubHeadId,
}: {
  selectValue: string
  selectChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  processHeadId: number
  processSubHeadId: number
}): JSX.Element => {
  return (
    <CFormSelect
      data-testid={`tailorSelect-${processHeadId}-${processSubHeadId}`}
      value={selectValue}
      onChange={selectChangeHandler}
    >
      <option value={TailoringRequiredSelectOptions.Yes}>
        {TailoringRequiredSelectOptions.Yes}
      </option>
      <option value={TailoringRequiredSelectOptions.No}>
        {TailoringRequiredSelectOptions.No}
      </option>
      <option value={TailoringRequiredSelectOptions.WaivedOff}>
        {TailoringRequiredSelectOptions.WaivedOff}
      </option>
    </CFormSelect>
  )
}

export default TailoringRequiredSelect
