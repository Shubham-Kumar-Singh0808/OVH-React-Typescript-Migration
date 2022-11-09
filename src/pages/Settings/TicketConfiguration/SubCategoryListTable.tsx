import React, { useState } from 'react'
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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { SubCategoryListTableProps } from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const SubCategoryListTable = (
  props: SubCategoryListTableProps,
): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSubCategoryId, setToDeleteSubCategoryId] = useState(0)
  const [toDeleteSubCategoryName, setToDeleteSubCategoryName] = useState('')
  const dispatch = useAppDispatch()

  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategoryList,
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

  const handleShowDeleteModal = (
    subCategoryId: number,
    subCategoryName: string,
  ) => {
    setToDeleteSubCategoryId(subCategoryId)
    setToDeleteSubCategoryName(subCategoryName)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteSubCategory = async () => {
    setIsDeleteModalVisible(false)
    const deleteSubCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.deleteSubCategory(
        toDeleteSubCategoryId,
      ),
    )

    const toastElement = (
      <OToast
        toastMessage="Sub-Category deleted successfully"
        toastColor={'success'}
      />
    )
    if (
      reduxServices.ticketConfiguration.deleteSubCategory.fulfilled.match(
        deleteSubCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      // dispatch(
      //   reduxServices.ticketConfiguration.getTicketConfigurationSubCategoryList(
      //     {
      //       startIndex: pageSize * (currentPage - 1),
      //       endIndex: pageSize * currentPage,
      //       departmentId: 0,
      //       categoryId: 0,
      //       subCategoryId: 0,
      //     },
      //   ),
      // )
    }
  }

  const handleTicketHistoryClick = (id: number) => {
    dispatch(
      reduxServices.ticketConfiguration.actions.setToggle('ticketHistory'),
    )
    dispatch(
      reduxServices.ticketConfiguration.ticketHistoryDetails({
        filterName: 'sub_catagory',
        id,
      }),
    )
  }

  return (
    <>
      {subCategoryList?.list && (
        <>
          <CTable
            className="mt-4 ps-0 alignment"
            striped
            responsive
            align="middle"
          >
            <CTableHead className="text-center">
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
            <CTableBody className="text-center">
              {subCategoryList &&
                subCategoryList?.list?.map((ticket, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{ticket.departmentName}</CTableDataCell>
                      <CTableDataCell>{ticket.categoryName}</CTableDataCell>
                      <CTableDataCell>{ticket.subCategoryName}</CTableDataCell>
                      <CTableDataCell>
                        {ticket.estimatedTime || 0}
                      </CTableDataCell>
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
                              onClick={() =>
                                handleTicketHistoryClick(ticket.subCategoryId)
                              }
                            >
                              <i
                                className="fa fa-bar-chart"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                          <CTooltip content="Delete">
                            <CButton
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() =>
                                handleShowDeleteModal(
                                  ticket.subCategoryId,
                                  ticket.subCategoryName,
                                )
                              }
                              // data-testid={`client-delete-btn${props.id}`}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
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
                {subCategoryList?.list?.length
                  ? `Total Records: ${subCategoryList?.list?.length}`
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
      )}

      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Sub-Category"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteSubCategory}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteSubCategoryName}</strong> sub-category ?
        </>
      </OModal>
    </>
  )
}

export default SubCategoryListTable
