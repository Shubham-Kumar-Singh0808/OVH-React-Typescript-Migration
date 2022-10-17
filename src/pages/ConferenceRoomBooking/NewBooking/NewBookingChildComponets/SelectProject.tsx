import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import Autocomplete from 'react-autocomplete'
import React, { useState, useEffect } from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { GetAllProjectNames } from '../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'

const SelectProject = ({
  setSelectProject,
}: {
  setSelectProject: React.Dispatch<
    React.SetStateAction<GetAllProjectNames | undefined>
  >
}): JSX.Element => {
  const allProjectNames = useTypedSelector(
    reduxServices.newBooking.selectors.projectNames,
  )
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (projectsAutoCompleteTarget) {
      dispatch(
        reduxServices.newBooking.getAllProjectSearchData(
          projectsAutoCompleteTarget,
        ),
      )
    }
  }, [projectsAutoCompleteTarget])

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
    const selectedProject = allProjectNames.find(
      (value) => value.projectName === projectName,
    )
    setSelectProject(selectedProject)
  }
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-2 col-form-label text-end">
        Project:
        <span className={projectsAutoCompleteTarget ? TextWhite : TextDanger}>
          *
        </span>
      </CFormLabel>
      <CCol sm={4}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            placeholder: 'Project Name',
          }}
          getItemValue={(item) => item.projectName}
          items={allProjectNames ? allProjectNames : []}
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
          value={projectsAutoCompleteTarget}
          shouldItemRender={(item, itemValue) =>
            item?.projectName?.toLowerCase().indexOf(itemValue.toLowerCase()) >
            -1
          }
          onChange={(e) => setProjectsAutoCompleteTarget(e.target.value)}
          onSelect={(selectedVal) => onHandleSelectProjectName(selectedVal)}
        />
      </CCol>
    </CRow>
  )
}

export default SelectProject
