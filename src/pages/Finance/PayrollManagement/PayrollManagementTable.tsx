import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import ViewPaySlip from './ViewPaySlip/ViewPaySlip'
import OModal from '../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const PayrollManagementTable = (props: {
  selectMonth: string
  selectYear: string
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: (value: string) => void
  setToEditPayslip: (value: CurrentPayslip) => void
  isChecked: boolean
  setIsChecked: (value: boolean) => void
  isAllChecked: boolean
  setIsAllChecked: (value: boolean) => void
  userDeleteAccess: boolean
  userEditAccess: boolean
  editPaySlipHandler: (payslipItem: CurrentPayslip) => void
  selectedIds: number[]
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [deletePaySlipId, setDeletePaySlipId] = useState(0)
  const [selectedPaySlipDetails, setSelectedPaySlipDetails] = useState(
    {} as CurrentPayslip,
  )
  const [deletePayslip, setDeletePayslip] = useState('')

  const renderingPayslipData = useTypedSelector(
    reduxServices.payrollManagement.selectors.paySlipList,
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
  }, [
    dispatch,
    props.selectMonth,
    props.selectYear,
    props.pageSize,
    props.currentPage,
  ])

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

  const deleteButtonHandler = (id: number, name: string) => {
    setIsDeleteModalVisible(true)
    setDeletePaySlipId(id)
    setDeletePayslip(name)
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

  const handleModal = (payslipItem: CurrentPayslip) => {
    setIsViewModalVisible(true)
    setSelectedPaySlipDetails(payslipItem)
  }
  const totalNoOfRecords = renderingPayslipData?.length
    ? `Total Records: ${PaySlipsListSize}`
    : `No Records found...`

  const getItemNumber = (index: number) => {
    return (props.currentPage - 1) * props.pageSize + index + 1
  }

  const getVisibleRecords = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * 20
    const endIndex = startIndex + 20
    return renderingPayslipData.slice(startIndex, endIndex)
  }

  const handleSelect = (paySlipId: number) => {
    const newSelectedIds = [...props.selectedIds]
    if (newSelectedIds.includes(paySlipId)) {
      newSelectedIds.splice(newSelectedIds.indexOf(paySlipId), 1)
    } else {
      newSelectedIds.push(paySlipId)
    }
    props.setSelectedIds(newSelectedIds)
  }

  // const handleRowSelect = (id: number) => {
  //   props.setSelectedIds([...props.selectedIds, id])
  // }

  return (
    <>
      <CCol className="custom-scroll scroll-alignment py-4">
        {renderingPayslipData?.length > 0 ? (
          <CTable
            striped
            responsive
            className="text-start text-left align-middle alignment"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  All
                  <CFormCheck
                    className="form-check-input form-select-not-allowed"
                    name="deleteCheckbox"
                    checked={props.isAllChecked}
                    onChange={(e) => props.setIsAllChecked(e.target.checked)}
                    data-testid="ch-All"
                  />
                </CTableHeaderCell>
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
                <CTableHeaderCell scope="col">
                  Other Allowance{' '}
                </CTableHeaderCell>
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
              {getVisibleRecords(1)?.length > 0 &&
                getVisibleRecords(1)?.map((payslipItem, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-middle ms-2">
                        <CFormCheck
                          className="form-check-input form-select-not-allowed"
                          name="deleteCheckbox"
                          checked={props.selectedIds.includes(
                            payslipItem.paySlipId,
                          )}
                          onChange={() => handleSelect(payslipItem.paySlipId)}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                      <CTableDataCell>{payslipItem.employeeId}</CTableDataCell>
                      <CTableDataCell>{payslipItem.name}</CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.designation || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>{payslipItem.joiningDate}</CTableDataCell>
                      <CTableDataCell>{payslipItem.accountNo}</CTableDataCell>
                      <CTableDataCell>{payslipItem.grossSalary}</CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.variablePayPercentage}
                      </CTableDataCell>
                      <CTableDataCell>{payslipItem.variablePay}</CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.grossSalAfterVariablepay}
                      </CTableDataCell>
                      <CTableDataCell>{payslipItem.basicSalary}</CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.houseRentAllowance}
                      </CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.transportAllowance}
                      </CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.otherAllowance}
                      </CTableDataCell>
                      <CTableDataCell>{payslipItem.absent}</CTableDataCell>
                      <CTableDataCell>{payslipItem.lossOfPay}</CTableDataCell>
                      <CTableDataCell>{payslipItem.medicliam}</CTableDataCell>
                      <CTableDataCell>{payslipItem.esi}</CTableDataCell>
                      <CTableDataCell>{payslipItem.epf}</CTableDataCell>
                      <CTableDataCell>{payslipItem.gratuity}</CTableDataCell>
                      <CTableDataCell>{payslipItem.advArrears}</CTableDataCell>
                      <CTableDataCell>{payslipItem.erc}</CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.taxDeductionScheme}
                      </CTableDataCell>
                      <CTableDataCell>
                        {payslipItem.professionalTax}
                      </CTableDataCell>
                      <CTableDataCell>{payslipItem.mealsCard}</CTableDataCell>
                      <CTableDataCell>{payslipItem.donation}</CTableDataCell>
                      <CTableDataCell>{payslipItem.arrears}</CTableDataCell>
                      <CTableDataCell>{payslipItem.incentive}</CTableDataCell>
                      <CTableDataCell>{payslipItem.vpayable}</CTableDataCell>

                      <CTableDataCell>{payslipItem.netSalary}</CTableDataCell>
                      <CTableDataCell>{payslipItem.remarks}</CTableDataCell>
                      <CTableDataCell>{payslipItem.month}</CTableDataCell>
                      <CTableDataCell>{payslipItem.year}</CTableDataCell>
                      <CTableDataCell className="actions">
                        {props.userEditAccess && (
                          <CTooltip content="Edit">
                            <CButton
                              size="sm"
                              className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                              color="info btn-ovh me-1"
                              onClick={() => {
                                props.editPaySlipHandler(payslipItem)
                              }}
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        )}
                        {props.userDeleteAccess && (
                          <CTooltip content="Delete">
                            <CButton
                              data-testid={`btn-delete${index}`}
                              size="sm"
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() =>
                                deleteButtonHandler(
                                  payslipItem.paySlipId,
                                  payslipItem.name,
                                )
                              }
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        )}
                        <CTooltip content="View">
                          <CButton
                            data-testid={`btn-view${index}`}
                            size="sm"
                            color="info"
                            className="btn-ovh-employee-list"
                            onClick={() => handleModal(payslipItem)}
                          >
                            <i className="fa fa-search-plus  text-white"></i>
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        ) : (
          <></>
        )}
      </CCol>
      <CRow>
        <CCol xs={4}>
          {renderingPayslipData?.length > 0 ? (
            <p className="mt-2">
              <strong>{totalNoOfRecords}</strong>
            </p>
          ) : (
            <></>
          )}
        </CCol>
        <CCol xs={3}>
          {PaySlipsListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={props.pageSize}
            />
          )}
        </CCol>
        {PaySlipsListSize > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={props.currentPage}
              pageSetter={props.setCurrentPage}
              paginationRange={props.paginationRange}
            />
          </CCol>
        )}
      </CRow>
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
        <>
          Do you really want to delete this <strong>{deletePayslip}</strong>{' '}
          record ?{' '}
        </>
      </OModal>
      <OModal
        alignment="center"
        visible={isViewModalVisible}
        setVisible={setIsViewModalVisible}
        closeButtonClass="d-none"
        modalBodyClass="mt-0"
        modalFooterClass="d-none"
        modalSize="lg"
      >
        <>
          <ViewPaySlip selectedPaySlipDetails={selectedPaySlipDetails} />
        </>
      </OModal>
    </>
  )
}
export default PayrollManagementTable
