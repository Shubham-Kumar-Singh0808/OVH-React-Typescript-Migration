import { CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { ExperienceChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../../utils/helper'

const Experience = ({
  dynamicFormLabelProps,
  onExperienceHandler,
  experienceValue,
}: ExperienceChangeHandlerProp): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testId="experienceLabel"
          {...dynamicFormLabelProps(
            'experience',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Experience:
          <span className={showIsRequired(experienceValue >= 0 ? 'show' : '')}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="experience"
            size="sm"
            type="number"
            name="experience"
            placeholder="Experience"
            data-testId="experienceForm"
            min="0"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onExperienceHandler(Number(e.target.value))
            }
            value={experienceValue}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Experience
