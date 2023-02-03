import { CRow, CCol, CFormLabel, CFormInput } from '@coreui/react-pro'
import React from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const EmployeePayslipPersonalDetails = ({
  onChangeInputHandler,
  toEditPayslip,
  setToEditPayslipCopy,
}: {
  toEditPayslip: CurrentPayslip
  onChangeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  designation: string
  accountNo: string
  setToEditPayslipCopy: React.Dispatch<React.SetStateAction<CurrentPayslip>>
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'
  console.log(toEditPayslip?.designation)
  const onChangeDesignationInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setToEditPayslipCopy((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }
  return (
    <>
      <CRow className="mt-1 mb-0 align-items-center">
        <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          Name:
        </CFormLabel>
        <CCol sm={3}>
          <p className="mb-0">{toEditPayslip.name}</p>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-0 align-items-center">
        <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          Employee Id:
        </CFormLabel>
        <CCol sm={3}>
          <p className="mb-0">{toEditPayslip.employeeId}</p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('designation', formLabel)}>
          Designation:
          <span className={toEditPayslip?.designation ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="designation"
            data-testid="designation-name"
            name="designation"
            autoComplete="off"
            value={toEditPayslip?.designation}
            placeholder="designation"
            onChange={onChangeDesignationInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-0 align-items-center">
        <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          DOJ:
        </CFormLabel>
        <CCol sm={3}>
          <p className="mb-0">{toEditPayslip.dateOfBirth}</p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('designation', formLabel)}>
          Account Number:
          <span className={toEditPayslip.accountNo ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="accountNo"
            data-testid="accountNo"
            name="accountNo"
            autoComplete="off"
            value={toEditPayslip.accountNo}
            placeholder="AccountNum"
            onChange={onChangeDesignationInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('grossSalary', formLabel)}>
          Gross Salary:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="grossSalary"
            data-testid="grossSalary"
            name="grossSalary"
            autoComplete="off"
            value={toEditPayslip.grossSalary}
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
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="variablePayPercentage"
            data-testid="variablePayPercentage"
            name="variablePayPercentage"
            autoComplete="off"
            value={toEditPayslip.variablePayPercentage}
            placeholder="variablePayPercentage"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('variablePay', formLabel)}>
          Variable Pay:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="variablePay"
            data-testid="variablePay"
            name="variablePay"
            autoComplete="off"
            value={toEditPayslip.variablePay}
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
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="grossSalAfterVariablepay"
            data-testid="grossSalAfterVariablepay"
            name="grossSalAfterVariablepay"
            autoComplete="off"
            value={toEditPayslip.grossSalAfterVariablepay}
            placeholder="grossSalAfterVariablepay"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('basicSalary', formLabel)}>
          Basic Salary:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="basicSalary"
            data-testid="basicSalary"
            name="basicSalary"
            autoComplete="off"
            value={toEditPayslip.basicSalary}
            placeholder="basicSalary"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('houseRentAllowance', formLabel)}>
          House Rent Allowance:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="houseRentAllowance"
            data-testid="houseRentAllowance"
            name="houseRentAllowance"
            autoComplete="off"
            value={toEditPayslip.houseRentAllowance}
            placeholder="houseRentAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('transportAllowance', formLabel)}>
          Transport Allowance:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="transportAllowance"
            data-testid="transportAllowance"
            name="transportAllowance"
            autoComplete="off"
            value={toEditPayslip.transportAllowance}
            placeholder="transportAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('otherAllowance', formLabel)}>
          Other Allowance:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="otherAllowance"
            data-testid="otherAllowance"
            name="otherAllowance"
            autoComplete="off"
            value={toEditPayslip.otherAllowance}
            placeholder="otherAllowance"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('absent', formLabel)}>
          Absent:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="absent"
            data-testid="absent"
            name="absent"
            autoComplete="off"
            value={toEditPayslip.absent}
            placeholder="absent"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('lossOfPay', formLabel)}>
          LOP :
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="lossOfPay"
            data-testid="lossOfPay"
            name="lossOfPay"
            autoComplete="off"
            value={toEditPayslip.lossOfPay}
            placeholder="lossOfPay"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('mealsCard', formLabel)}>
          Meals Card:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="mealsCard"
            data-testid="mealsCard"
            name="mealsCard"
            autoComplete="off"
            value={toEditPayslip.mealsCard}
            placeholder="mealsCard"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeePayslipPersonalDetails
