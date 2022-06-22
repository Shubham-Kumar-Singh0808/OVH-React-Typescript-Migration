import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import {
  GetHRAssociate,
  HrDataProps,
} from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React, { useState } from 'react'

import Autocomplete from 'react-autocomplete'

// import { fakeRequest, getStates } from 'react-autocomplete'

const HRAssociate = ({
  dynamicFormLabelProps,
  hrDataList,
  onSelectHRAssociate,
}: HrDataProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  const onHandleSelectHRAssociate = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = hrDataList.find((value) => value.fullName === fullName)

    const reportManager = {
      id: managerName?.id,
      fullName: managerName?.fullName,
    } as GetHRAssociate
    onSelectHRAssociate(reportManager)
  }
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'hrassociate',
            'col-sm-3 col-form-label text-end',
          )}
        >
          HR Associate:
          <span
          //   className={
          //     employeeBasicInformationEditData.curentLocation
          //       ? 'text-white'
          //       : 'text-danger'
          //   }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              id: 'hr-autocomplete',
              placeholder: 'Type name here for auto fill',
            }}
            getItemValue={(item) => item.fullName}
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
            renderItem={(item, isHighlighted) => (
              <div
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
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => onHandleSelectHRAssociate(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default HRAssociate
