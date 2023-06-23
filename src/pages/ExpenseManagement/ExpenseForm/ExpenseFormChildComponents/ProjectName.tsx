import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { ProjectsListResponse } from '../../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const ProjectList = ({
  projectsList,
  onSelectProject,
  projectAutoCompleteTarget,
  setProjectAutoCompleteTarget,
  shouldReset,
}: {
  projectsList: ProjectsListResponse[]
  onSelectProject: (value: ProjectsListResponse) => void
  projectAutoCompleteTarget: string | undefined
  setProjectAutoCompleteTarget: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  shouldReset: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (projectAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getProjectsList(projectAutoCompleteTarget),
      )
    }
  }, [projectAutoCompleteTarget])

  useEffect(() => {
    if (shouldReset) setProjectAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectAutoCompleteTarget(projectName)
    const project = projectsList.find(
      (value) => value.projectName === projectName,
    )
    onSelectProject(project as ProjectsListResponse)
  }

  return (
    <CRow className="mt-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="projectLabel"
      >
        Project Name:
        <span className={shouldReset ? TextWhite : TextDanger}>*</span>
      </CFormLabel>
      <CCol sm={3}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            id: 'projectName-autocomplete',
            placeholder: 'Project Name',
          }}
          getItemValue={(item) => item.projectName}
          items={projectsList ? projectsList : []}
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
              data-testid="project-option"
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
          shouldItemRender={(item, itemValue) =>
            item?.projectName?.toLowerCase().indexOf(itemValue.toLowerCase()) >
            -1
          }
          onChange={(e) => setProjectAutoCompleteTarget(e.target.value)}
          onSelect={(selectedVal) => onHandleSelectProjectName(selectedVal)}
        />
      </CCol>
    </CRow>
  )
}

export default ProjectList
