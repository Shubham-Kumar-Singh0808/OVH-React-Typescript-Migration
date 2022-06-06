import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'

import { DateChangeHandlerProp } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import DatePicker from 'react-datepicker'

const EmploymentContract = ({
  dynamicFormLabelProps,
  onDateChangeHandler,
}: DateChangeHandlerProp): JSX.Element => {
  const [contractIsDisable, setContractIsDisable] = useState<boolean>(false)
  return (
    <>
      <CRow className="mb-3 align-items-center">
        <CFormLabel
          {...dynamicFormLabelProps(
            'employmentcontract',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Employment Contract:
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
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractyes"
            value="Yes"
            label="Yes"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setContractIsDisable(true)
            }
          />
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractno"
            value="No"
            label="No"
            defaultChecked
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setContractIsDisable(false)
            }
          />
        </CCol>
      </CRow>
      {contractIsDisable ? (
        <>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps(
                'contractstartdate',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Contract Start Date:
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
              <DatePicker
                id="contractstartdate"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="contractstartdate"
                value=""
                onChange={(date: Date) => onDateChangeHandler(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps(
                'contractenddate',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Contract End Date:
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
              <DatePicker
                id="contractenddate"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="contractenddate"
                value=""
                onChange={(date: Date) => onDateChangeHandler(date)}
              />
              <span></span>
            </CCol>
          </CRow>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default EmploymentContract
