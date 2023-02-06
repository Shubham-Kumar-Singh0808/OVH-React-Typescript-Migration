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
  }

  useEffect(() => {
    if (toEditPayslip != null) {
      setToEditPayslipCopy(toEditPayslip)
    }
  }, [toEditPayslip])

  useEffect(() => {
    if (toEditPayslipCopy?.designation && toEditPayslipCopy?.accountNo) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [toEditPayslipCopy])

  const dispatch = useAppDispatch()

  const updateToastMessage = (
    <OToast
      toastMessage="Your changes have been saved successfully.
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

        <EmployeePayslipPersonalDetails
          toEditPayslipCopy={toEditPayslipCopy}
          onChangeInputHandler={onChangeInputHandler}
        />
        <EmployeePayslipTaxDetails
          toEditPayslipCopy={toEditPayslipCopy}
          onChangeInputHandler={onChangeInputHandler}
        />
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
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
