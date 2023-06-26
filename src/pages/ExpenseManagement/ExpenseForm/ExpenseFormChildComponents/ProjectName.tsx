import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'

const ProjectList = ({
  projectAutoCompleteTarget,
  setProjectAutoCompleteTarget,
}: {
  projectAutoCompleteTarget: string
  setProjectAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const formLabel = 'col-sm-3 col-form-label text-end'
  const [isEnable, setIsEnable] = useState(false)
  const projectList = useTypedSelector(
    reduxServices.expenseForm.selectors.allProjectsList,
  )
  //Projects AutoComplete Implementation
  const projectItemsLayout = (
    id: string | number,
    projectName: string,
    isHighlighted: boolean,
  ): JSX.Element => {
    return (
      <div
        data-testid="option"
        className={
          isHighlighted
            ? 'autocomplete-dropdown-item active'
            : 'autocomplete-dropdown-item '
        }
        key={id}
      >
        {projectName}
      </div>
    )
  }

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectAutoCompleteTarget(projectName)
    setIsEnable(true)
  }

  return (
    <CRow className="mt-3 mb-3">
      <CFormLabel {...formLabelProps} className={formLabel}>
        Project Name:
      </CFormLabel>
      <CCol sm={3}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm2',
            id: 'project-autocomplete',
            placeholder: 'Project Name',
          }}
          getItemValue={(item) => item.projectName}
          data-testid="projectautocomplete"
          items={projectList}
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
          renderItem={(item, isHighlighted) =>
            projectItemsLayout(item.id, item.projectName, isHighlighted)
          }
          value={projectAutoCompleteTarget}
          shouldItemRender={(item, projectValue) =>
            item?.projectName
              ?.toLowerCase()
              .indexOf(projectValue.toLowerCase()) > -1
          }
          onChange={(e) => setProjectAutoCompleteTarget(e.target.value)}
          onSelect={(selectedVal) => onHandleSelectProjectName(selectedVal)}
        />
        {/* {isProjectNameExist && ()} */}
        <span
          className={isEnable ? TextWhite : TextDanger}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.25rem',
          }}
        >
          Please select valid project
        </span>
      </CCol>
      <CCol></CCol>
    </CRow>
  )
}

export default ProjectList
