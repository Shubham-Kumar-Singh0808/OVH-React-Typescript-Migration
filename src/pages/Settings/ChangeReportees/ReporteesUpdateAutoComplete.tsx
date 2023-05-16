import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import EmployeesListUnderManagerTable from './EmployeesListUnderManagerTable'
import { EmployeeData } from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import { showIsRequired } from '../../../utils/helper'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ReporteesUpdateAutoComplete = ({
  managersOrHrManagersList,
  placeHolder,
  setManagerId,
  setValidName,
  autoCompleteTarget,
}: {
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
  setManagerId: React.Dispatch<React.SetStateAction<number>>
  setValidName: React.Dispatch<React.SetStateAction<boolean>>
  autoCompleteTarget: string
}): JSX.Element => {
  const [autoCompleteTargetInternal, setAutoCompleteTargetInternal] =
    useState<string>('')

  const isLoading = useTypedSelector(
    reduxServices.changeReportees.selectors.isLoading,
  )

  const onClickHandler = () => {
    setAutoCompleteTargetInternal('')
  }
  const filter = managersOrHrManagersList?.filter(
    (item) => item.fullName === autoCompleteTargetInternal,
  )

  setValidName(!!filter[0]?.fullName)
  console.log('valid name', !!filter[0]?.fullName)

  const filteredManagersOrHrManagersList = managersOrHrManagersList?.filter(
    (item) => item.fullName !== autoCompleteTarget,
  )

  const onHandleSelectManager = (fullName: string) => {
    setAutoCompleteTargetInternal(fullName)
    const managerName = managersOrHrManagersList.find(
      (data) => data.fullName === fullName,
    )
    setManagerId(managerName?.id as number)
  }

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow className="mb-3 ms-5">
            <CCol sm={2}>
              <CFormLabel data-testid="pmLabel">
                Project Manager:
                <span
                  className={filter[0]?.fullName ? 'text-white' : 'text-danger'}
                >
                  *
                </span>
              </CFormLabel>
            </CCol>

            <CCol sm={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  id: 'projectmanagers-autocomplete',
                  placeholder: placeHolder,
                }}
                getItemValue={(item) => item.fullName}
                items={filteredManagersOrHrManagersList}
                data-testid="pmautocomplete"
                wrapperStyle={{ position: 'relative' }}
                renderMenu={(children) => (
                  <div
                    className={
                      autoCompleteTargetInternal &&
                      autoCompleteTargetInternal.length > 0
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
                    key={item.fullName}
                  >
                    {item.fullName}
                  </div>
                )}
                value={autoCompleteTargetInternal}
                shouldItemRender={(item, value) =>
                  item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                onChange={(e) => {
                  setAutoCompleteTargetInternal(e.target.value)
                }}
                onSelect={(value) => {
                  onHandleSelectManager(value)
                }}
              />
            </CCol>
            <CCol sm={2}>
              <CButton
                color="warning "
                className="btn-ovh"
                data-testid="clear-manager"
                // disabled={!isViewBtnEnabled}
                onClick={onClickHandler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ReporteesUpdateAutoComplete
