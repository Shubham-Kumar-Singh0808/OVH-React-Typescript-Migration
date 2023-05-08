import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const PaySlipExcelFileTable = (props: {
  selectMonth: string
  selectYear: string
  currentPage: number
  pageSize: number
  setExcelTable: (value: boolean) => void
  setToggle: (value: string) => void
  setClearFile: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const excelData = useTypedSelector(
    reduxServices.payrollManagement.selectors.excelData,
  )
  const clearExcelData = () => {
    props.setToggle('')
    props.setExcelTable(false)
    dispatch(reduxServices.payrollManagement.clearDirectory())
    dispatch(
      reduxServices.payrollManagement.getCurrentPayslip({
        startIndex: props.pageSize * (props.currentPage - 1),
        endIndex: props.pageSize * props.currentPage,
        month: props.selectMonth,
        year: Number(props.selectYear),
      }),
    )
    props.setClearFile('')
  }

  const successToast = (
    <OToast
      toastMessage={`Data Successfully Uploaded for ${props.selectMonth} month of ${props.selectYear}`}
      toastColor="success"
    />
  )

  const handleUploadFile = async () => {
    props.setToggle('')
    props.setExcelTable(false)
    const prepareObject = {
      month: props.selectMonth,
      year: Number(props.selectYear),
    }
    const uploadBtnActionResult = await dispatch(
      reduxServices.payrollManagement.saveExcelFile(prepareObject),
    )
    if (
      reduxServices.payrollManagement.saveExcelFile.fulfilled.match(
        uploadBtnActionResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
      props.setClearFile('')
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: props.pageSize * (props.currentPage - 1),
          endIndex: props.pageSize * props.currentPage,
          month: props.selectMonth,
          year: Number(props.selectYear),
        }),
      )
    }
  }

  return (
    <>
      {excelData?.length > 0 ? (
        <>
          <CRow className="sh-excelScroll mt-4">
            <CTable responsive className="sh-excelTable">
              <CTableBody>
                <CTableRow className="excelTable-color">
                  <CTableHeaderCell>Serial No</CTableHeaderCell>
                  <CTableHeaderCell>Joining Date</CTableHeaderCell>
                  <CTableHeaderCell>Emp Id</CTableHeaderCell>
                  <CTableHeaderCell>Account No</CTableHeaderCell>
                  <CTableHeaderCell>Designation</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Gross Salary</CTableHeaderCell>
                  <CTableHeaderCell>V.pay %</CTableHeaderCell>
                  <CTableHeaderCell>V Pay</CTableHeaderCell>
                  <CTableHeaderCell>G.Salary after V.Pay</CTableHeaderCell>
                  <CTableHeaderCell>Basic </CTableHeaderCell>
                  <CTableHeaderCell>HR</CTableHeaderCell>
                  <CTableHeaderCell>TA</CTableHeaderCell>
                  <CTableHeaderCell>Other Allowance</CTableHeaderCell>
                  <CTableHeaderCell>Absent</CTableHeaderCell>
                  <CTableHeaderCell>LOP</CTableHeaderCell>
                  <CTableHeaderCell>MediClaim</CTableHeaderCell>
                  <CTableHeaderCell>Esi</CTableHeaderCell>
                  <CTableHeaderCell>Epf</CTableHeaderCell>
                  <CTableHeaderCell>Gratuity </CTableHeaderCell>
                  <CTableHeaderCell>S. Adv./Arrears/Other</CTableHeaderCell>
                  <CTableHeaderCell>ERC</CTableHeaderCell>
                  <CTableHeaderCell>TDS </CTableHeaderCell>
                  <CTableHeaderCell>P. Tax</CTableHeaderCell>
                  <CTableHeaderCell>Meals Card</CTableHeaderCell>
                  <CTableHeaderCell>Donation </CTableHeaderCell>
                  <CTableHeaderCell>Arrears</CTableHeaderCell>
                  <CTableHeaderCell>Incentive</CTableHeaderCell>
                  <CTableHeaderCell>VP payable</CTableHeaderCell>
                  <CTableHeaderCell>N.Salary</CTableHeaderCell>
                  <CTableHeaderCell>Remarks</CTableHeaderCell>
                </CTableRow>

                {excelData?.length > 0 &&
                  excelData?.map((item, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell className="sh-tdAlignment">
                          {item.serialNo}
                        </CTableDataCell>
                        <CTableDataCell>{item.joiningDate}</CTableDataCell>
                        <CTableDataCell>{item.employeeId}</CTableDataCell>
                        <CTableDataCell>{item.accountNo}</CTableDataCell>
                        <CTableDataCell>{item.designation}</CTableDataCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.grossSalary}</CTableDataCell>
                        <CTableDataCell>
                          {item.variablePayPercentage}
                        </CTableDataCell>
                        <CTableDataCell>{item.variablePay}</CTableDataCell>
                        <CTableDataCell>
                          {item.grossSalAfterVariablepay}
                        </CTableDataCell>
                        <CTableDataCell>{item.basicSalary}</CTableDataCell>
                        <CTableDataCell>
                          {item.houseRentAllowance}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.transportAllowance}
                        </CTableDataCell>
                        <CTableDataCell>{item.otherAllowance}</CTableDataCell>
                        <CTableDataCell>{item.absent}</CTableDataCell>
                        <CTableDataCell>{item.lossOfPay}</CTableDataCell>
                        <CTableDataCell>{item.medicliam}</CTableDataCell>
                        <CTableDataCell>{item.esi}</CTableDataCell>
                        <CTableDataCell>{item.epf}</CTableDataCell>
                        <CTableDataCell>{item.gratuity}</CTableDataCell>
                        <CTableDataCell>{item.advArrears}</CTableDataCell>
                        <CTableDataCell>{item.erc}</CTableDataCell>
                        <CTableDataCell>
                          {item.taxDeductionScheme}
                        </CTableDataCell>
                        <CTableDataCell>{item.professionalTax}</CTableDataCell>
                        <CTableDataCell>{item.mealsCard}</CTableDataCell>
                        <CTableDataCell>{item.donation}</CTableDataCell>
                        <CTableDataCell>{item.arrears}</CTableDataCell>
                        <CTableDataCell>{item.incentive}</CTableDataCell>
                        <CTableDataCell>{item.vpayable}</CTableDataCell>
                        <CTableDataCell>{item.netSalary}</CTableDataCell>
                        <CTableDataCell>{item.remarks}</CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            </CTable>
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {excelData?.length}</strong>
                </p>
              </CCol>
            </CRow>
          </CRow>
          <CButton
            data-testid="clear-btn"
            color="warning"
            className="btn-ovh text-white mt-3 me-2"
            onClick={clearExcelData}
          >
            Clear
          </CButton>
          <CButton
            data-testid="upload-btn"
            className="btn-primary btn-ovh me-1 text-white mt-3 sh-uploadFile"
            onClick={handleUploadFile}
          >
            Upload File
          </CButton>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default PaySlipExcelFileTable
