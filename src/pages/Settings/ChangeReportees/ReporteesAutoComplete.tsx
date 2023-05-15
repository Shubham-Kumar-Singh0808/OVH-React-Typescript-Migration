import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import EmployeesListUnderManagerTable from './EmployeesListUnderManagerTable'
import { ChangeReporteesProps } from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import { showIsRequired } from '../../../utils/helper'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ReporteesAutoComplete = ({
  managersOrHrManagersList,
  placeHolder,
  setAutoCompleteTarget,
  setShouldRenderTable,
  autoCompleteTarget,
  shouldRenderTable,
}: ChangeReporteesProps): JSX.Element => {
  const [isRequired, setIsRequired] = useState<boolean>(true)
  const [managerId, setManagerId] = useState<number>()

  const dispatch = useAppDispatch()
  console.log(placeHolder)
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
    setShouldRenderTable(false)
    dispatch(reduxServices.changeReportees.actions.clearManagerData())
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
      // console.log('place holder is', placeHolder)
      setShouldRenderTable(true)
    } else if (event.key === 'Enter' && placeHolder === 'Hr Name') {
      dispatch(
        reduxServices.changeReportees.getHrAssociatesUnderHRManagerAsync(
          managerId as number,
        ),
      )
      console.log('place holder is', placeHolder)
      setShouldRenderTable(true)
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
          <CRow>
            <CCol>
              {shouldRenderTable &&
                (placeHolder === 'Manager Name' ? (
                  <EmployeesListUnderManagerTable
                    employeeData={getEmployeesUnderManger}
                    managersOrHrManagersList={managersOrHrManagersList}
                    placeHolder={placeHolder}
                  />
                ) : (
                  <EmployeesListUnderManagerTable
                    employeeData={getHrAssociatesUnderManger}
                    managersOrHrManagersList={managersOrHrManagersList}
                    placeHolder={placeHolder}
                  />
                ))}
            </CCol>
          </CRow>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ReporteesAutoComplete
