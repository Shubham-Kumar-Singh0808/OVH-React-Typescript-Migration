import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import {
  GetReportManager,
  ReportManagerProps,
} from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const ReportingManager = ({
  dynamicFormLabelProps,
  reportManagersList,
  onSelectReportManager,
  shouldReset,
  isRequired,
  reportValue,
}: ReportManagerProps): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  useEffect(() => {
    setAutoCompleteTarget(reportValue)
  }, [reportValue])

  useEffect(() => {
    if (shouldReset) setAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelectReportManager = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const managerName = reportManagersList.find(
      (value) => value.fullName === fullName,
    )

    const reportManager = {
      id: managerName?.id,
      fullName: managerName?.fullName,
      lastName: managerName?.lastName,
      firstName: managerName?.firstName,
    } as GetReportManager
    onSelectReportManager(reportManager)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="rmLabel"
          {...dynamicFormLabelProps(
            'reportingmanager',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Reporting Manager:
          {isRequired && (
            <span className={showIsRequired(autoCompleteTarget as string)}>
              *
            </span>
          )}
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
            data-testid="report-input"
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
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => onHandleSelectReportManager(value)}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default ReportingManager
