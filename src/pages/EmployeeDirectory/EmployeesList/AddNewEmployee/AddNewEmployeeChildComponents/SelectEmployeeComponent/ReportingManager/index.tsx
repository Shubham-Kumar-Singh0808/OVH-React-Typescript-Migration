import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import {
  GetReportManager,
  ReportManagerProps,
} from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React, { useState } from 'react'

import Autocomplete from 'react-autocomplete'
import { showIsRequired } from '../../../../../../../utils/helper'

const ReportingManager = ({
  dynamicFormLabelProps,
  reportManagersList,
  onSelectReportManager,
}: ReportManagerProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  const onHandleSelectReportManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = reportManagersList.find(
      (value) => value.fullName === fullName,
    )

    const reportManager = {
      id: managerName?.id,
      fullName: managerName?.fullName,
    } as GetReportManager
    onSelectReportManager(reportManager)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'reportingmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Reporting Manager:
          <span className={showIsRequired(autoCompleteTarget as string)}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              id: 'reportingmanagers-autocomplete',
              placeholder: 'Type name here for auto fill',
            }}
            getItemValue={(item) => item.fullName}
            items={reportManagersList}
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
            onSelect={(value) => onHandleSelectReportManager(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ReportingManager
