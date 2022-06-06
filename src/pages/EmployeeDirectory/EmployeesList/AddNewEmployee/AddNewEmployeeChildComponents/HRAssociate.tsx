import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import Autocomplete from 'react-autocomplete'
import { HrDataProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

// import { fakeRequest, getStates } from 'react-autocomplete'

const HRAssociate = ({
  dynamicFormLabelProps,
  hrDataList,
}: HrDataProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()
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
            inputProps={{ id: 'hr-autocomplete' }}
            getItemValue={(item) => item.fullName}
            items={hrDataList}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
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
                className="autocomplete-dropdown-item"
                key={item.fullName}
                style={{ background: isHighlighted ? 'red' : 'white' }}
              >
                {item.fullName}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => setAutoCompleteTarget(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default HRAssociate
