import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import EmployeesListUnderManagerTable from './EmployeesListUnderManagerTable'
import {
  ChangeReporteesProps,
  EmployeeData,
} from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import { showIsRequired } from '../../../utils/helper'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ReporteesUpdateAutoComplete = ({
  managersOrHrManagersList,
  placeHolder,
}: {
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
}): JSX.Element => {
  const [isRequired, setIsRequired] = useState<boolean>(true)
  const [managerId, setManagerId] = useState<number>()
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>('')

  const dispatch = useAppDispatch()

  const getEmployeesUnderManger = useTypedSelector(
    reduxServices.changeReportees.selectors.EmployeesUnderManagerDetails,
  )
  const getHrAssociatesUnderManger = useTypedSelector(
    reduxServices.changeReportees.selectors.HrAssociatesUnderHRManager,
  )
  const isLoading = useTypedSelector(
    reduxServices.changeReportees.selectors.isLoading,
  )

  const onClickHandler = () => {
    setAutoCompleteTarget('')
  }

  const onHandleSelectManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = managersOrHrManagersList.find(
      (data) => data.fullName === fullName,
    )
    setManagerId(managerName?.id as number)
    setIsRequired(false)
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && placeHolder === 'Manager Name') {
      dispatch(
        reduxServices.changeReportees.getAllEmployeesUnderManagerAsync(
          managerId as number,
        ),
      )
    } else if (event.key === 'Enter' && placeHolder === 'Hr Name') {
      dispatch(
        reduxServices.changeReportees.getHrAssociatesUnderHRManagerAsync(
          managerId as number,
        ),
      )
    }
  }

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow className="mb-3 ms-5">
            <CCol sm={2}>
              <CFormLabel data-testid="pmLabel">
                Project Manager:
                {isRequired && (
                  <span
                    className={showIsRequired(autoCompleteTarget as string)}
                  >
                    *
                  </span>
                )}
              </CFormLabel>
            </CCol>

            <CCol sm={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  id: 'projectmanagers-autocomplete',
                  placeholder: placeHolder,
                  onKeyDown: handleSearchByEnter,
                }}
                getItemValue={(item) => item.fullName}
                items={managersOrHrManagersList}
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
                    key={item.fullName}
                  >
                    {item.fullName}
                  </div>
                )}
                value={autoCompleteTarget}
                shouldItemRender={(item, value) =>
                  item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                onChange={(e) => {
                  setAutoCompleteTarget(e.target.value)
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
