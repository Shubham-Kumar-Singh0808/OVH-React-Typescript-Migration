import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import Autocomplete from 'react-autocomplete'
import { ReportingManagerProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const ProjectManager = ({
  dynamicFormLabelProps,
  reportingManagersList,
}: ReportingManagerProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'projectmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Project Manager:
          <span
          //   className={
          //     employeeBasicInformationEditData.curentLocation
          //       ? 'text-white'
          //       : 'text-danger'
          //   }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              id: 'projectmanagers-autocomplete',
              placeholder: 'Type name here for auto fill',
            }}
            getItemValue={(item) => item.fullName}
            items={reportingManagersList}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  autoCompleteTarget && autoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.fullName}
              >
                {item.fullName}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => setAutoCompleteTarget(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectManager
