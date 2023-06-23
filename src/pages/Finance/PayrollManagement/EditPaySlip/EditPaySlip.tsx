import React, { useEffect, useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import EmployeePayslipPersonalDetails from './EmployeePayslipPersonalDetails'
import EmployeePayslipTaxDetails from './EmployeePayslipTaxDetails'
import OCard from '../../../../components/ReusableComponent/OCard'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const EditPaySlip = ({
  toEditPayslip,
  setToggle,
  selectMonth,
  selectYear,
  currentPage,
  pageSize,
}: {
  toEditPayslip: CurrentPayslip
  setToggle: (value: string) => void
  selectMonth: string
  selectYear: string
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const [toEditPayslipCopy, setToEditPayslipCopy] = useState<CurrentPayslip>(
    {} as CurrentPayslip,
  )
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState(false)
  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setToEditPayslipCopy((values) => {
      return { ...values, ...{ [name]: value } }
    })
    if (
      name === 'accountNo' ||
      name === 'grossSalary' ||
      name === 'variablePayPercentage' ||
      name === 'variablePay' ||
      name === 'grossSalAfterVariablepay' ||
      name === 'basicSalary' ||
      name === 'houseRentAllowance' ||
      name === 'transportAllowance' ||
      name === 'otherAllowance' ||
      name === 'absent' ||
      name === 'lossOfPay' ||
      name === 'mealsCard' ||
      name === 'medicliam' ||
      name === 'esi' ||
      name === 'epf' ||
      name === 'advArrears' ||
      name === 'erc' ||
      name === 'taxDeductionScheme' ||
      name === 'professionalTax' ||
      name === 'arrears' ||
      name === 'incentive' ||
      name === 'vpayable' ||
      name === 'netSalary' ||
      name === 'donation'
    ) {
      const newValue = value.replace(/\D/gi, '')
      setToEditPayslipCopy((prevState) => {
        return { ...prevState, ...{ [name]: newValue } }
      })
    }
  }

  useEffect(() => {
    if (toEditPayslip != null) {
      setToEditPayslipCopy(toEditPayslip)
    }
  }, [toEditPayslip])

  useEffect(() => {
    if (
      toEditPayslipCopy?.designation?.replace(/^\s*/, '') &&
      toEditPayslipCopy?.accountNo?.replace(/^\s*/, '')
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [toEditPayslipCopy])

  const dispatch = useAppDispatch()

  const updateToastMessage = (
    <OToast
      toastMessage="Payslip Updated Successfully.
    "
      toastColor="success"
    />
  )

  const handleUpdateHandler = async () => {
    const prepareObject = {
      ...toEditPayslipCopy,
    }
    const updatePaySlipsResultAction = await dispatch(
      reduxServices.payrollManagement.updatePayslip(prepareObject),
    )

    if (
      reduxServices.payrollManagement.updatePayslip.fulfilled.match(
        updatePaySlipsResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          month: selectMonth,
          year: Number(selectYear),
        }),
      )
      dispatch(reduxServices.app.actions.addToast(updateToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Payslip"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={'/payslipUpload'}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
                onClick={() => setToggle('')}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <EmployeePayslipPersonalDetails
              toEditPayslipCopy={toEditPayslipCopy}
              onChangeInputHandler={onChangeInputHandler}
              isDesignationReadonly={true}
            />
          </CCol>
          <CCol sm={6}>
            <EmployeePayslipTaxDetails
              toEditPayslipCopy={toEditPayslipCopy}
              onChangeInputHandler={onChangeInputHandler}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol sm={9} md={{ offset: 6 }}>
            <CButton
              data-testid="update-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isUpdateBtnEnabled}
              onClick={handleUpdateHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditPaySlip
