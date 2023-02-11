import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { GetAllReportingManagers } from '../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const SelectProjectManager = ({
  managers,
  onSelectManager,
  projectManagerValue,
}: {
  managers: GetAllReportingManagers[]
  onSelectManager: (value: string) => void
  projectManagerValue: string
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [projectManagerAutoComplete, setProjectManagerAutoComplete] =
    useState<string>()

  useEffect(() => {
    if (projectManagerAutoComplete) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectManagerAutoComplete,
        ),
      )
    }
    setProjectManagerAutoComplete(projectManagerValue)
  }, [projectManagerAutoComplete])

  const onHandleSelectProjectManager = (projectManagerName: string) => {
    setProjectManagerAutoComplete(projectManagerName)
    onSelectManager(projectManagerName)
  }

  // const onFocusOut = () => {
  //   const selectedProjectManager = managers.find(
  //     (value) => value.fullName === projectManagerAutoComplete,
  //   )
  //   onSelectManager(selectedProjectManager?.fullName as string)
  // }

  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Project Manager:
      </CFormLabel>
      <CCol sm={3}>
        <Autocomplete
          inputProps={{
            autoComplete: 'off',
            className: 'form-control form-control-sm',
            id: 'project-autocomplete',
            placeholder: 'Project Manager',
          }}
          getItemValue={(item) => item.fullName}
          items={managers}
          data-testid="project-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                projectManagerAutoComplete &&
                projectManagerAutoComplete.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              data-testid="projects-option"
              className={
                isHighlighted
                  ? 'autocomplete-dropdown-item active'
                  : 'autocomplete-dropdown-item '
              }
              key={item.id}
            >
              {item.projectName}
            </div>
          )}
          value={projectManagerAutoComplete}
          shouldItemRender={(item, value) =>
            item.projectName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setProjectManagerAutoComplete(e.target.value)}
          onSelect={(value) => onHandleSelectProjectManager(value)}
        />
      </CCol>
    </CRow>
  )
}

export default SelectProjectManager
