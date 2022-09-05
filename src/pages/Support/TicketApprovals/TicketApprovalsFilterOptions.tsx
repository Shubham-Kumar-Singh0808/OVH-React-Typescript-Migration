import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const TicketApprovalsFilterOptions = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const pendingApproval = 'Pending Approval'
  const [ticketStatusState, setTicketStatusState] = useState<string>('New')
  const [approvalStatus, setApprovalStatus] = useState<string>(pendingApproval)
  const [deptId, setDeptId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const [subCategoryId, setSubCategoryId] = useState<string>('')
  const [dateOption, setDateOption] = useState<string>('Today')

  const departmentList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentNameList,
  )

  const departmentCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentCategoryList,
  )

  const subCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.subCategoryList,
  )

  useEffect(() => {
    if (deptId) {
      dispatch(reduxServices.ticketApprovals.getDepartmentCategoryList(deptId))
    }
  }, [deptId])

  useEffect(() => {
    if (categoryId) {
      dispatch(reduxServices.ticketApprovals.getSubCategoryList(categoryId))
    }
  }, [categoryId])

  const ticketStatusList = [
    { label: 'All', name: 'All' },
    { label: 'Closed', name: 'Closed' },
    { label: 'Feedback', name: 'Feedback' },
    { label: 'Fixed', name: 'Fixed' },
    { label: 'In Progress', name: 'In Progress' },
    { label: 'New', name: 'New' },
  ]

  const approvalStatusList = [
    { label: 'All', name: 'All' },
    { label: 'Approved', name: 'Approved' },
    { label: 'Cancelled', name: 'Cancelled' },
    { label: 'Pending Approval', name: pendingApproval },
    { label: 'Rejected', name: 'Rejected' },
  ]

  const dateOptionsList = [
    { label: 'Current Month', name: 'Current Month' },
    { label: 'Custom', name: 'Custom' },
    { label: 'Last Month', name: 'Last Month' },
    { label: 'Last Week Approval', name: 'Last Week' },
    { label: 'This Week', name: 'This Week' },
    { label: 'Today', name: 'Today' },
    { label: 'Yesterday', name: 'Yesterday' },
  ]

  return (
    <CRow className="mt-4">
      <CCol sm={2}>
        <CFormLabel>Ticket Status:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="ticketStatus"
          data-testid="ticketStatus"
          name="ticketStatus"
          value={ticketStatusState}
          onChange={(e) => {
            setTicketStatusState(e.target.value)
          }}
        >
          {ticketStatusList.map((ticketItem, index) => (
            <option key={index} value={ticketItem.label}>
              {ticketItem.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol sm={2}>
        <CFormLabel>Approval Status:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="ApprovalStatus"
          data-testid="ApprovalStatus"
          name="ApprovalStatus"
          value={approvalStatus}
          onChange={(e) => {
            setApprovalStatus(e.target.value)
          }}
        >
          {approvalStatusList.map((approvalItem, index) => (
            <option key={index} value={approvalItem.label}>
              {approvalItem.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol sm={2}>
        <CFormLabel>Department Name:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="departmentName"
          data-testid="departmentName"
          name="departmentName"
          value={deptId}
          onChange={(e) => {
            setDeptId(Number(e.target.value))
          }}
        >
          <option value="">All</option>
          {departmentList
            .slice()
            .sort((department1, department2) =>
              department1.name.localeCompare(department2.name),
            )
            ?.map((dept, index) => (
              <option key={index} value={dept.id}>
                {dept.name}
              </option>
            ))}
        </CFormSelect>
      </CCol>
      <CCol sm={2}>
        <CFormLabel>Category Name:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="categoryName"
          data-testid="categoryNameSelect"
          name="categoryName"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(Number(e.target.value))
            console.log(Number(e.target.value))
          }}
        >
          <option value="">All</option>
          {departmentCategoryList?.map((category, categoryIndex) => (
            <option key={categoryIndex} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol sm={2}>
        <CFormLabel>Sub-Category Name:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="subCategoryName"
          data-testid="subCategoryNameSelect"
          name="subCategoryName"
          value={subCategoryId}
          onChange={(e) => {
            setSubCategoryId(e.target.value)
          }}
        >
          <option value="">All</option>
          {subCategoryList?.map((subCategory, subCategoryIndex) => (
            <option key={subCategoryIndex} value={subCategory.subCategoryId}>
              {subCategory.subCategoryName}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol sm={2}>
        <CFormLabel>Date:</CFormLabel>
        <CFormSelect
          aria-label="Default select example"
          size="sm"
          id="dateOption"
          data-testid="dateOptionSelect"
          name="dateOption"
          value={dateOption}
          onChange={(e) => {
            setDateOption(e.target.value)
          }}
        >
          {dateOptionsList.map((currentOption, index) => (
            <option key={index} value={currentOption.label}>
              {currentOption.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default TicketApprovalsFilterOptions
