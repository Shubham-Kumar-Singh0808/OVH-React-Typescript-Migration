import React from 'react'
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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { SubCategoryListTableProps } from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const SubCategoryListTable = (
  props: SubCategoryListTableProps,
): JSX.Element => {
  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategories,
  )
  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleSubCategoryListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const workFlowChecked = <CFormCheck checked disabled />
  const workFlowUnChecked = <CFormCheck disabled />
  return (
    <>
      <CTable className="mt-4 ps-0 alignment" striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department Name</CTableHeaderCell>
            <CTableHeaderCell>Category Name</CTableHeaderCell>
            <CTableHeaderCell>Sub-Category Name</CTableHeaderCell>
            <CTableHeaderCell>Estimated Time(hh.mm)</CTableHeaderCell>
            <CTableHeaderCell>Work Flow</CTableHeaderCell>
            <CTableHeaderCell>Level of Hierarchy</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {subCategoryList?.map((ticket, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{ticket.departmentName}</CTableDataCell>
                <CTableDataCell>{ticket.categoryName}</CTableDataCell>
                <CTableDataCell>{ticket.subCategoryName}</CTableDataCell>
                <CTableDataCell>{ticket.estimatedTime || 0}</CTableDataCell>
                <CTableDataCell>
                  {ticket.workFlow === true
                    ? workFlowChecked
                    : workFlowUnChecked}
                </CTableDataCell>
                <CTableDataCell>
                  {ticket?.levelOfHierarchy || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <div className="buttons-subCategoryList">
                    <CTooltip content="Edit">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list"
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Ticket Timeline">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        data-testid="subCategoryTimelineBtn"
                      >
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Delete">
                      <CButton
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        // data-testid={`client-delete-btn${props.id}`}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </div>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol md={3} className="pull-left">
          <strong>
            {subCategoryList?.length
              ? `Total Records: ${subCategoryList.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {subCategoryListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={
                handleSubCategoryListPageSizeSelectChange
              }
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {subCategoryListSize > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default SubCategoryListTable
