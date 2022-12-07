import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import OModal from '../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'

const PayrollManagementTable = (props: {
  selectMonth: string
  selectYear: string
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deletePaySlipId, setDeletePaySlipId] = useState(0)

  const renderingPayslipData = useTypedSelector(
    reduxServices.payrollManagement.selectors.paySlipInfo,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (props.selectMonth && props.selectYear)
      dispatch(
        reduxServices.payrollManagement.getCurrentPayslip({
          startIndex: props.pageSize * (props.currentPage - 1),
          endIndex: props.pageSize * props.currentPage,
          month: props.selectMonth,
          year: Number(props.selectYear),
        }),
      )
  }, [dispatch, props.selectMonth, props.selectYear])

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Payslip Deleted Successfully" />
  )

  const confirmDeletePayslip = async () => {
    setIsDeleteModalVisible(false)
    await dispatch(
      reduxServices.payrollManagement.deletePayslip(deletePaySlipId),
    )

    dispatch(
      reduxServices.payrollManagement.getCurrentPayslip({
        startIndex: props.pageSize * (props.currentPage - 1),
        endIndex: props.pageSize * props.currentPage,
        month: props.selectMonth,
        year: Number(props.selectYear),
      }),
    )
    dispatch(reduxServices.app.actions.addToast(deletedToastElement))
  }
  console.log(renderingPayslipData)

  const deleteButtonHandler = (id: number) => {
    setIsDeleteModalVisible(true)
    setDeletePaySlipId(id)
  }

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    props.setPageSize(Number(event.target.value))
    props.setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const PaySlipsListSize = useTypedSelector(
    reduxServices.payrollManagement.selectors.PaySlipsListSize,
  )

  return (
    <>
      <CCol className="custom-scroll">
        <CTable
          striped
          responsive
          className="text-start text-left align-middle alignment"
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
              <CTableHeaderCell scope="col">DOJ</CTableHeaderCell>
              <CTableHeaderCell scope="col">A/C No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">G.Salary</CTableHeaderCell>
              <CTableHeaderCell scope="col">V.Pay %</CTableHeaderCell>
              <CTableHeaderCell scope="col">V.Pay</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                G.Salary after V.Pay
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Basic</CTableHeaderCell>
              <CTableHeaderCell scope="col">HR</CTableHeaderCell>
              <CTableHeaderCell scope="col">TA</CTableHeaderCell>
              <CTableHeaderCell scope="col">Other Allowance </CTableHeaderCell>
              <CTableHeaderCell scope="col">Absent</CTableHeaderCell>
              <CTableHeaderCell scope="col">LOP</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mediclaim</CTableHeaderCell>
              <CTableHeaderCell scope="col">ESI</CTableHeaderCell>
              <CTableHeaderCell scope="col">EPF</CTableHeaderCell>
              <CTableHeaderCell scope="col">Gratuity</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                S.Adv/Arrears/Other
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">ERC</CTableHeaderCell>

              <CTableHeaderCell scope="col">TDS</CTableHeaderCell>

              <CTableHeaderCell scope="col">P.Tax</CTableHeaderCell>

              <CTableHeaderCell scope="col">Meals Card</CTableHeaderCell>

              <CTableHeaderCell scope="col">Donation</CTableHeaderCell>

              <CTableHeaderCell scope="col">Arrears</CTableHeaderCell>

              <CTableHeaderCell scope="col">Incentive</CTableHeaderCell>

              <CTableHeaderCell scope="col">VP Payable </CTableHeaderCell>

              <CTableHeaderCell scope="col">N.Salary</CTableHeaderCell>

              <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>

              <CTableHeaderCell scope="col">Month</CTableHeaderCell>

              <CTableHeaderCell scope="col">Year</CTableHeaderCell>

              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {renderingPayslipData?.length > 0 &&
              renderingPayslipData?.map((item, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.employeeId}</CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.designation}</CTableDataCell>
                    <CTableDataCell>{item.joiningDate}</CTableDataCell>
                    <CTableDataCell>{item.accountNo}</CTableDataCell>
                    <CTableDataCell>{item.grossSalary}</CTableDataCell>
                    <CTableDataCell>
                      {item.variablePayPercentage}
                    </CTableDataCell>
                    <CTableDataCell>{item.variablePay}</CTableDataCell>
                    <CTableDataCell>
                      {item.grossSalAfterVariablepay}
                    </CTableDataCell>
                    <CTableDataCell>{item.basicSalary}</CTableDataCell>
                    <CTableDataCell>{item.houseRentAllowance}</CTableDataCell>
                    <CTableDataCell>{item.transportAllowance}</CTableDataCell>
                    <CTableDataCell>{item.otherAllowance}</CTableDataCell>
                    <CTableDataCell>{item.absent}</CTableDataCell>
                    <CTableDataCell>{item.lossOfPay}</CTableDataCell>
                    <CTableDataCell>{item.medicliam}</CTableDataCell>
                    <CTableDataCell>{item.esi}</CTableDataCell>
                    <CTableDataCell>{item.epf}</CTableDataCell>
                    <CTableDataCell>{item.gratuity}</CTableDataCell>
                    <CTableDataCell>{item.advArrears}</CTableDataCell>
                    <CTableDataCell>{item.erc}</CTableDataCell>
                    <CTableDataCell>{item.taxDeductionScheme}</CTableDataCell>
                    <CTableDataCell>{item.professionalTax}</CTableDataCell>
                    <CTableDataCell>{item.mealsCard}</CTableDataCell>
                    <CTableDataCell>{item.donation}</CTableDataCell>
                    <CTableDataCell>{item.arrears}</CTableDataCell>
                    <CTableDataCell>{item.incentive}</CTableDataCell>
                    <CTableDataCell>{item.vpayable}</CTableDataCell>
                    <CTableDataCell>{item.netSalary}</CTableDataCell>
                    <CTableDataCell>{item.remarks}</CTableDataCell>
                    <CTableDataCell>{item.month}</CTableDataCell>
                    <CTableDataCell>{item.year}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Edit">
                        <CButton
                          size="sm"
                          className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                          color="info btn-ovh me-1"
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                          onClick={() => deleteButtonHandler(item.paySlipId)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </CCol>
      {renderingPayslipData?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {PaySlipsListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {PaySlipsListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={props.pageSize}
              />
            )}
          </CCol>
          {PaySlipsListSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={props.currentPage}
                pageSetter={props.setCurrentPage}
                paginationRange={props.paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Payslip"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        modalBodyClass="mt-0"
        confirmButtonAction={confirmDeletePayslip}
      >
        <>Do you really want to delete this </>
      </OModal>
    </>
  )
}
export default PayrollManagementTable
