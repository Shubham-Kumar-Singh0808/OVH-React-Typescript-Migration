import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import {
  GetHRAssociate,
  HrDataProps,
} from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const HRAssociate = ({
  dynamicFormLabelProps,
  hrDataList,
  onSelectHRAssociate,
  isRequired,
  shouldReset,
  hrValue,
}: HrDataProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  const onChangeHRAssociate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCompleteTarget(e.target.value)
    if (e.target.value === '') onSelectHRAssociate({} as GetHRAssociate)
  }

  const onHandleSelectHRAssociate = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = hrDataList.find((data) => data.fullName === fullName)

    const reportManager = {
      id: managerName?.id,
      fullName: managerName?.fullName,
      firstName: managerName?.firstName,
      lastName: managerName?.lastName,
    } as GetHRAssociate
    onSelectHRAssociate(reportManager)
  }

  useEffect(() => {
    setAutoCompleteTarget(hrValue)
  }, [hrValue])

  useEffect(() => {
    if (shouldReset) setAutoCompleteTarget('')
  }, [shouldReset])

  const onChangeHRAssociate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCompleteTarget(e.target.value)
    if (e.target.value === '') onSelectHRAssociate({} as GetHRAssociate)
  }

  const itemsLayout = (
    id: string | number,
    fullName: string,
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
        {fullName}
      </div>
    )
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="hrLabel"
          {...dynamicFormLabelProps(
            'hrassociate',
            'col-sm-3 col-form-label text-end',
          )}
        >
          HR Associate:
          {isRequired && (
            <span className={showIsRequired(autoCompleteTarget as string)}>
              *
            </span>
          )}
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm hr-autocomplete',
              id: 'hr-autocomplete',
              placeholder: 'Type name here for auto fill',
            }}
            getItemValue={(item) => item.fullName}
            data-testid="hrautocomplete"
            items={hrDataList}
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
            renderItem={(item, isHighlighted) =>
              itemsLayout(item.id, item.fullName, isHighlighted)
            }
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => onChangeHRAssociate(e)}
            onSelect={(value) => onHandleSelectHRAssociate(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default HRAssociate
