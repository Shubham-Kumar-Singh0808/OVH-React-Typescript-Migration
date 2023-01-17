import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react-pro'
import React from 'react'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const EmployeePayslipTaxDetails = ({
  onChangeInputHandler,
  toEditPayslip,
}: {
  toEditPayslip: CurrentPayslip
  onChangeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const formLabel = 'col-sm-3 col-form-label text-end'

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('medicliam', formLabel)}>
          Medicliam:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="medicliam"
            data-testid="medicliam"
            name="medicliam"
            autoComplete="off"
            value={toEditPayslip.medicliam}
            placeholder="medicliam"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('esi', formLabel)}>
          ESI:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="esi"
            data-testid="esi"
            name="esi"
            autoComplete="off"
            value={toEditPayslip.esi}
            placeholder="esi"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('epf', formLabel)}>
          EPF:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="epf"
            data-testid="epf"
            name="epf"
            autoComplete="off"
            value={toEditPayslip.epf}
            placeholder="epf"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('advArrears', formLabel)}>
          Adv Arrears:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="advArrears"
            data-testid="advArrears"
            name="advArrears"
            autoComplete="off"
            value={toEditPayslip.advArrears}
            placeholder="advArrears"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('erc', formLabel)}>
          ERC:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="erc"
            data-testid="erc"
            name="erc"
            autoComplete="off"
            value={toEditPayslip.erc}
            placeholder="erc"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('taxDeductionScheme', formLabel)}>
          Tax Deduction at Source:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="taxDeductionScheme"
            data-testid="taxDeductionScheme"
            name="taxDeductionScheme"
            autoComplete="off"
            value={toEditPayslip.taxDeductionScheme}
            placeholder="taxDeductionScheme"
            onChange={onChangeInputHandler}
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
        <CFormLabel {...dynamicFormLabelProps('professionalTax', formLabel)}>
          Professional Tax:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="professionalTax"
            data-testid="professionalTax"
            name="professionalTax"
            autoComplete="off"
            value={toEditPayslip.professionalTax}
            placeholder="professionalTax"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('arrears', formLabel)}>
          Arrears:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="arrears"
            data-testid="arrears"
            name="arrears"
            autoComplete="off"
            value={toEditPayslip.arrears}
            placeholder="arrears"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('incentive', formLabel)}>
          Incentive:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="incentive"
            data-testid="incentive"
            name="incentive"
            autoComplete="off"
            value={toEditPayslip.incentive}
            placeholder="incentive"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('vpayable', formLabel)}>
          Vpayable:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="vpayable"
            data-testid="vpayable"
            name="vpayable"
            autoComplete="off"
            value={toEditPayslip.vpayable}
            placeholder="vpayable"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('netSalary', formLabel)}>
          Net Salary:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="netSalary"
            data-testid="netSalary"
            name="netSalary"
            autoComplete="off"
            value={toEditPayslip.netSalary}
            placeholder="netSalary"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('gratuity', formLabel)}>
          Gratuity:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="gratuity"
            data-testid="gratuity"
            name="gratuity"
            autoComplete="off"
            value={toEditPayslip.gratuity}
            placeholder="gratuity"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('remarks', formLabel)}>
          Remarks:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="remarks"
            data-testid="remarks"
            name="remarks"
            autoComplete="off"
            value={toEditPayslip.remarks}
            placeholder="remarks"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-0 align-items-center">
        <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          Month:
        </CFormLabel>
        <CCol sm={3}>
          <p className="mb-0">{toEditPayslip.month}</p>
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-0 align-items-center">
        <CFormLabel className="col-sm-3 col-form-label text-end p-1">
          Year:
        </CFormLabel>
        <CCol sm={3}>
          <p className="mb-0">{toEditPayslip.year}</p>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel {...dynamicFormLabelProps('donation', formLabel)}>
          Donation:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="donation"
            data-testid="donation"
            name="donation"
            autoComplete="off"
            value={toEditPayslip.donation}
            placeholder="donation"
            onChange={onChangeInputHandler}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeePayslipTaxDetails