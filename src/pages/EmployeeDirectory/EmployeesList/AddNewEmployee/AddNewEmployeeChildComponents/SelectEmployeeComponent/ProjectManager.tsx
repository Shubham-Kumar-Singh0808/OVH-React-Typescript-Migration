import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import {
  GetProjectManager,
  ManagerProps,
} from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const ProjectManager = ({
  dynamicFormLabelProps,
  managersList,
  onSelectManager,
  shouldReset,
  projectValue,
}: ManagerProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  useEffect(() => {
    setAutoCompleteTarget(projectValue)
  }, [projectValue])

  useEffect(() => {
    if (shouldReset) setAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelectManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = managersList.find(
      (value) => value.fullName === fullName,
    )

    const projectManager = {
      id: managerName?.id,
      fullName: managerName?.fullName,
      lastName: managerName?.lastName,
      firstName: managerName?.firstName,
    } as GetProjectManager
    onSelectManager(projectManager)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="pmLabel"
          {...dynamicFormLabelProps(
            'projectmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Project Manager:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              id: 'projectmanagers-autocomplete',
              placeholder: 'Type name here for auto fill',
            }}
            getItemValue={(item) => item.fullName}
            items={managersList}
            data-testid="pmautocomplete"
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
                data-testid="option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.fullName}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => onHandleSelectManager(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectManager
