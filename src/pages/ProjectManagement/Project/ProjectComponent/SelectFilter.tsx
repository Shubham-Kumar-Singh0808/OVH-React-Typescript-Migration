import React from 'react'
import { CFormSelect } from '@coreui/react-pro'
import { ProjectFilterProps } from '../../../../types/ProjectManagement/Project/ProjectTypes'

export const SelectFilter = ({
  list,
  name,
  label,
  placeHolder,
  value,
  onChange,
}: ProjectFilterProps): JSX.Element => (
  <CFormSelect
    aria-label={label}
    size="sm"
    id={name}
    data-testid={name}
    name={name}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    {placeHolder != null && <option value={''}>{placeHolder}</option>}
    {list.map((opt, index) => (
      <option key={index} value={opt.label}>
        {opt.name}
      </option>
    ))}
  </CFormSelect>
)
