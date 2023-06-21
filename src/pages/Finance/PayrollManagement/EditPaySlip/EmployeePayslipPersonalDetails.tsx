import { CRow, CCol, CFormLabel, CFormInput } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const EmployeePayslipPersonalDetails = ({
  onChangeInputHandler,
  toEditPayslipCopy,
  isDesignationReadonly,
}: {
  toEditPayslipCopy: CurrentPayslip
  onChangeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  isDesignationReadonly: boolean
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const formLabel = 'col-sm-6 col-form-label text-end'

  return (
    <>
      <CRow className="mt-4 mb-4 align-items-center">
        <CFormLabel className="col-sm-6 col-form-label text-end">
          Name:
        </CFormLabel>
        <CCol sm={5}>
          <p className="mb-0">
            <b>{toEditPayslipCopy.name}</b>
          </p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4 align-items-center">
        <CFormLabel className="col-sm-6 col-form-label text-end">
          Employee Id:
        </CFormLabel>
        <CCol sm={5}>
          <p className="mb-0">
            <b>{toEditPayslipCopy.employeeId}</b>
          </p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-6 col-form-label text-end p-1">
          Designation:
          <span
            className={
              toEditPayslipCopy.designation?.replace(/^\s*/, '')
                ? TextWhite
                : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="designation"
            data-testid="designation-name"
            name="designation"
            autoComplete="off"
            readOnly={isDesignationReadonly}
            value={toEditPayslipCopy.designation}
            placeholder="designation"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4 align-items-center">
        <CFormLabel className="col-sm-6 col-form-label text-end">
          DOJ:
        </CFormLabel>
        <CCol sm={5}>
          <p className="mb-0">
            <b>{toEditPayslipCopy.dateOfBirth}</b>
          </p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-6 col-form-label text-end p-1">
          Account Number:
          <span
            className={
              toEditPayslipCopy.accountNo?.replace(/^\s*/, '')
                ? TextWhite
                : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="accountNo"
            data-testid="accountNo"
            name="accountNo"
            autoComplete="off"
            value={toEditPayslipCopy.accountNo}
            placeholder="AccountNum"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('grossSalary', formLabel)}>
          Gross Salary:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="grossSalary"
            data-testid="grossSalary"
            name="grossSalary"
            autoComplete="off"
            value={toEditPayslipCopy.grossSalary}
            placeholder="grossSalary"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...dynamicFormLabelProps('variablePayPercentage', formLabel)}
        >
          Variable Pay Percentage:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="variablePayPercentage"
            data-testid="variablePayPercentage"
            name="variablePayPercentage"
            autoComplete="off"
            value={toEditPayslipCopy.variablePayPercentage}
            placeholder="variablePayPercentage"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('variablePay', formLabel)}>
          Variable Pay:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="variablePay"
            data-testid="variablePay"
            name="variablePay"
            autoComplete="off"
            value={toEditPayslipCopy.variablePay}
            placeholder="variablePay"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel
          {...dynamicFormLabelProps('grossSalAfterVariablepay', formLabel)}
        >
          Gross Sal After Variable Pay:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="grossSalAfterVariablepay"
            data-testid="grossSalAfterVariablepay"
            name="grossSalAfterVariablepay"
            autoComplete="off"
            value={toEditPayslipCopy.grossSalAfterVariablepay}
            placeholder="grossSalAfterVariablepay"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('basicSalary', formLabel)}>
          Basic Salary:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="basicSalary"
            data-testid="basicSalary"
            name="basicSalary"
            autoComplete="off"
            value={toEditPayslipCopy.basicSalary}
            placeholder="basicSalary"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('houseRentAllowance', formLabel)}>
          House Rent Allowance:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="houseRentAllowance"
            data-testid="houseRentAllowance"
            name="houseRentAllowance"
            autoComplete="off"
            value={toEditPayslipCopy.houseRentAllowance}
            placeholder="houseRentAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('transportAllowance', formLabel)}>
          Transport Allowance:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="transportAllowance"
            data-testid="transportAllowance"
            name="transportAllowance"
            autoComplete="off"
            value={toEditPayslipCopy.transportAllowance}
            placeholder="transportAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('otherAllowance', formLabel)}>
          Other Allowance:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="otherAllowance"
            data-testid="otherAllowance"
            name="otherAllowance"
            autoComplete="off"
            value={toEditPayslipCopy.otherAllowance}
            placeholder="otherAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('absent', formLabel)}>
          Absent:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="absent"
            data-testid="absent"
            name="absent"
            autoComplete="off"
            value={toEditPayslipCopy.absent}
            placeholder="absent"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('lossOfPay', formLabel)}>
          LOP :
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="lossOfPay"
            data-testid="lossOfPay"
            name="lossOfPay"
            autoComplete="off"
            value={toEditPayslipCopy.lossOfPay}
            placeholder="lossOfPay"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('mealsCard', formLabel)}>
          Meals Card:
        </CFormLabel>
        <CCol sm={5}>
          <CFormInput
            type="text"
            id="mealsCard"
            data-testid="mealsCard"
            name="mealsCard"
            autoComplete="off"
            value={toEditPayslipCopy.mealsCard}
            placeholder="mealsCard"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeePayslipPersonalDetails
