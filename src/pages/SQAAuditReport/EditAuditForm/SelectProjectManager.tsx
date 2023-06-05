import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
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
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )
  const [projectManagerAutoComplete, setProjectManagerAutoComplete] =
    useState<string>(projectManagerValue)

  useEffect(() => {
    if (projectManagerAutoComplete) {
      dispatch(
        reduxServices.newEmployee.reportingManagersService.getAllReportingManagers(),
      )
    }
  }, [projectManagerAutoComplete])

  const onHandleSelectProjectManager = (projectManagerName: string) => {
    setProjectManagerAutoComplete(projectManagerName)
    onSelectManager(projectManagerName)
  }

  useEffect(() => {
    setProjectManagerAutoComplete(projectManagerValue)
  }, [projectManagerValue])

  return (
    <CRow className="mt-1 mb-3 align-items-center">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Project Manager :
      </CFormLabel>
      {selectedAuditDetails?.projectType === 'true' ? (
        <>
          <CCol sm={3}>
            <span className="fw-bold">{projectManagerValue}</span>
          </CCol>
        </>
      ) : (
        <>
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
                  {item.fullName}
                </div>
              )}
              value={projectManagerAutoComplete}
              shouldItemRender={(item, value) =>
                item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setProjectManagerAutoComplete(e.target.value)}
              onSelect={(value) => onHandleSelectProjectManager(value)}
            />
          </CCol>
        </>
      )}
    </CRow>
  )
}

export default SelectProjectManager
