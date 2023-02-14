import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { GetAllProjects } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const SelectProjectName = ({
  projects,
  projectValue,
  onSelectProject,
  isDisabled,
  editAuditForm,
}: {
  projects: GetAllProjects[]
  onSelectProject: (value: string) => void
  projectValue: string
  isDisabled: boolean
  editAuditForm: string
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
    setProjectsAutoCompleteTarget(projectValue)
  }, [projectsAutoCompleteTarget, projectValue])

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
    onSelectProject(selectedProject?.projectName as string)
    // setShowProjectManagerName(selectedProject?.managerName as string)
  }

  return (
    <CRow className="mt-4 mb-4">
      <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
        Project Name :
      </CFormLabel>
      <CCol sm={3}>
        {isDisabled ? (
          <>
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
          </>
        ) : (
          <>
            {' '}
            <span className="fw-bold">{editAuditForm}</span>
          </>
        )}
      </CCol>
    </CRow>
  )
}

export default SelectProjectName
