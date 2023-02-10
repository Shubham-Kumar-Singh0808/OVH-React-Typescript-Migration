import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { GetAllProjects } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const SelectProjectName = ({
  projects,
  onSelectProject,
}: {
  projects: GetAllProjects[]
  onSelectProject: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>()

  useEffect(() => {
    if (projectsAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectsAutoCompleteTarget,
        ),
      )
    }
  }, [projectsAutoCompleteTarget])

  const onHandleSelectProject = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
  }

  const selectAuditees = () => {
    const selectedProject = projects.find(
      (value) => value.projectName === projectsAutoCompleteTarget,
    )
    dispatch(
      reduxServices.addNewAuditForm.getProjectEmployees(
        selectedProject?.id as number,
      ),
    )
    // setShowProjectManagerName(selectedProject?.managerName as string)
  }

  // const onFocusOut = () => {
  //   const selectedProject = projects.find(
  //     (value) => value.projectName === projectsAutoCompleteTarget,
  //   )
  //   onSelectProject(selectedProject?.projectName as string)
  //   if (!selectedProject) {
  //     dispatch(reduxServices.newEvent.actions.clearProjectMembers())
  //     onSelectProject(projectsAutoCompleteTarget as string)
  //   }
  // }

  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Project Name:
      </CFormLabel>
      <CCol sm={3}>
        <Autocomplete
          inputProps={{
            autoComplete: 'off',
            className: 'form-control form-control-sm',
            id: 'project-autocomplete',
            placeholder: 'Project',
            onBlur: selectAuditees,
          }}
          getItemValue={(item) => item.projectName}
          items={projects}
          data-testid="project-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                projectsAutoCompleteTarget &&
                projectsAutoCompleteTarget.length > 0
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
          value={projectsAutoCompleteTarget}
          shouldItemRender={(item, value) =>
            item.projectName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setProjectsAutoCompleteTarget(e.target.value)}
          onSelect={(value) => onHandleSelectProject(value)}
        />
      </CCol>
    </CRow>
  )
}

export default SelectProjectName
