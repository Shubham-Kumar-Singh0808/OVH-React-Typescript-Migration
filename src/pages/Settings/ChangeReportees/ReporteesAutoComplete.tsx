import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import EmployeesListUnderManagerTable from './EmployeesListUnderManagerTable'
import { ChangeReporteesProps } from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [managerId, setManagerId] = useState<number>()

  useEffect(() => {
    if (autoCompleteTarget.length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [autoCompleteTarget])

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

  //clears the data
  const onClickHandler = () => {
    setShouldRenderTable(false)
    dispatch(reduxServices.changeReportees.actions.clearManagerData())
    setAutoCompleteTarget('')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCompleteTarget(e.target.value)
  }
  const filter = managersOrHrManagersList?.filter(
    (item) => item.fullName === autoCompleteTarget,
  )
  const validationClassName = filter[0]?.fullName ? 'text-white' : 'text-danger'
  //sets the manager id and autocomplete value
  const onHandleSelectManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = managersOrHrManagersList.find(
      (data) => data.fullName === fullName,
    )
    setManagerId(managerName?.id as number)
  }

  //gets the employees under manager
  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === 'Enter' &&
      placeHolder === 'Manager Name' &&
      filter[0]?.fullName
    ) {
      dispatch(
        reduxServices.changeReportees.getAllEmployeesUnderManagerAsync(
          managerId as number,
        ),
      )
      setShouldRenderTable(true)
    } else if (
      event.key === 'Enter' &&
      placeHolder === 'Hr Name' &&
      filter[0]?.fullName
    ) {
      dispatch(
        reduxServices.changeReportees.getHrAssociatesUnderHRManagerAsync(
          managerId as number,
        ),
      )

      setShouldRenderTable(true)
    }
  }
  const employeeListUnderManagerTableComponent =
    placeHolder === 'Manager Name' ? (
      <EmployeesListUnderManagerTable
        employeeData={getEmployeesUnderManger}
        managersOrHrManagersList={managersOrHrManagersList}
        placeHolder={placeHolder}
        onClickHandler={onClickHandler}
        autoCompleteTarget={autoCompleteTarget}
      />
    ) : (
      <EmployeesListUnderManagerTable
        employeeData={getHrAssociatesUnderManger}
        managersOrHrManagersList={managersOrHrManagersList}
        placeHolder={placeHolder}
        onClickHandler={onClickHandler}
        autoCompleteTarget={autoCompleteTarget}
      />
    )

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CRow className="mb-3">
            <CFormLabel
              data-testid="mLabel"
              className="col-sm-2 col-form-label text-end ms-5"
            >
              From Manager:
              <span className={validationClassName}>*</span>
            </CFormLabel>

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
                data-testid="mgr-autocomplete"
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
                onChange={onChangeInput}
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
                disabled={isDisabled}
                onClick={onClickHandler}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              {shouldRenderTable && employeeListUnderManagerTableComponent}
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
