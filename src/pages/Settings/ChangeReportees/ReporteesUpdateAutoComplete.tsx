import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { EmployeeData } from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (autoCompleteTargetInternal.length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [autoCompleteTargetInternal])

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

  const validationClassName = filter[0]?.fullName ? 'text-white' : 'text-danger'

  const filteredManagersOrHrManagersList = managersOrHrManagersList?.filter(
    (item) => item.fullName !== autoCompleteTarget,
  )
  //sets the autocomplete value and manager id
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
          <CRow className="mb-3 mt-3">
            <CFormLabel
              data-testid="pmLabel"
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
                disabled={isDisabled}
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
