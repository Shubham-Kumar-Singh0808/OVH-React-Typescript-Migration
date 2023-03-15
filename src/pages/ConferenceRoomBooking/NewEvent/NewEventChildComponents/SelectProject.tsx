import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { GetAllProjects } from '../../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const SelectProject = ({
  allProjects,
  onSelectProject,
  isProjectAndAttendeesEnable,
  shouldReset,
}: {
  allProjects: GetAllProjects[]
  onSelectProject: (value: string) => void
  isProjectAndAttendeesEnable: boolean
  shouldReset: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [projectAutoCompleteTarget, setProjectAutoCompleteTarget] =
    useState<string>()
  useEffect(() => {
    if (shouldReset) setProjectAutoCompleteTarget('')
  }, [shouldReset])

  useEffect(() => {
    if (projectAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectAutoCompleteTarget,
        ),
      )
    }
  }, [projectAutoCompleteTarget])

  const onHandleSelectProject = (projectName: string) => {
    setProjectAutoCompleteTarget(projectName)
  }

  const onFocusOut = () => {
    const selectedProject = allProjects.find(
      (value) => value.projectName === projectAutoCompleteTarget,
    )
    onSelectProject(selectedProject?.projectName as string)
    if (!selectedProject) {
      dispatch(reduxServices.newEvent.actions.clearProjectMembers())
      onSelectProject(projectAutoCompleteTarget as string)
    }
  }

  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end pe-18"
        data-testid="pmLabel"
      >
        Project :
      </CFormLabel>
      <CCol sm={6}>
        <Autocomplete
          inputProps={{
            autoComplete: 'off',
            className: 'form-control form-control-sm',
            id: 'project-autocomplete',
            placeholder: 'Project',
            disabled: isProjectAndAttendeesEnable,
            onBlur: onFocusOut,
          }}
          getItemValue={(item) => item.projectName}
          items={allProjects}
          data-testid="project-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                projectAutoCompleteTarget &&
                projectAutoCompleteTarget.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              data-testid="trainer-option"
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
          value={projectAutoCompleteTarget}
          shouldItemRender={(item, value) =>
            item.projectName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setProjectAutoCompleteTarget(e.target.value)}
          onSelect={(value) => onHandleSelectProject(value)}
        />
      </CCol>
    </CRow>
  )
}

export default SelectProject
