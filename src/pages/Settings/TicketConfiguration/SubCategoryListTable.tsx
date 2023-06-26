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

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToTicketConfiguration = userAccessToFeatures?.find(
    (feature) => feature.name === 'Ticket Configuration',
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

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const workFlowChecked = (
    <span className="hidden-block sh-tracker-checkbox">
      <CFormCheck
        className="form-check-input form-select-not-allowed"
        checked
        disabled
      />
    </span>
  )
  const workFlowUnChecked = (
    <span className="hidden-block sh-tracker-checkbox">
      <CFormCheck
        className="form-check-input form-select-not-allowed"
        disabled
      />
    </span>
  )

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
      let tempPageNum = currentPage
      if (subCategoryList.list?.length === 1 && currentPage !== 1) {
        setCurrentPage((prevState) => prevState - 1)
        tempPageNum = currentPage - 1
      }
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategoryList(
          {
            startIndex: pageSize * (tempPageNum - 1),
            endIndex: pageSize * tempPageNum,
            departmentId: props.filterByDepartment,
            categoryId: props.filterByCategory,
            subCategoryId: props.filterBySubCategory,
          },
        ),
      )
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

  const paginationComponent =
    subCategoryList?.size > 0 ? (
      <CRow className="mt-3">
        <CCol xs={4}>
          <strong>{`Total Records: ${subCategoryList.size}`}</strong>
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
    ) : (
      <CRow className="mt-3 ms-3">
        <strong>No Records Found... </strong>
      </CRow>
    )

  return (
    <>
      {props.isTableView && (
        <>
          <CTable
            className="mt-4 ps-0 alignment"
            striped
            responsive
            align="middle"
          >
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
            {subCategoryList?.size > 0 && (
              <CTableBody>
                {subCategoryList &&
                  subCategoryList?.list?.map((ticket, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                        <CTableDataCell>{ticket.departmentName}</CTableDataCell>
                        <CTableDataCell>{ticket.categoryName}</CTableDataCell>
                        <CTableDataCell>
                          {ticket.subCategoryName}
                        </CTableDataCell>
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
                            {userAccessToTicketConfiguration?.updateaccess && (
                              <CTooltip content="Edit">
                                <CButton
                                  color="info btn-ovh me-1"
                                  className="btn-ovh-employee-list"
                                  data-testid={`sc-edit-btn${index}`}
                                  onClick={() =>
                                    props.editSubCategoryButtonHandler({
                                      subCategoryId: ticket.subCategoryId,
                                      subCategoryName: ticket.subCategoryName,
                                      estimatedTime: ticket.estimatedTime,
                                      workFlow: ticket.workFlow,
                                      categoryId: ticket.categoryId,
                                      categoryName: ticket.categoryName,
                                      departmentName: ticket.departmentName,
                                      departmentId: ticket.departmentId,
                                      levelOfHierarchy: ticket.levelOfHierarchy,
                                    })
                                  }
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </CButton>
                              </CTooltip>
                            )}
                            <CTooltip content="Ticket Timeline">
                              <CButton
                                color="info btn-ovh me-1"
                                className="btn-ovh-employee-list"
                                data-testid={`sc-timeline-btn${index}`}
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
                            {userAccessToTicketConfiguration?.deleteaccess && (
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
                                  data-testid={`sc-delete-btn${index}`}
                                >
                                  <i
                                    className="fa fa-trash-o"
                                    aria-hidden="true"
                                  ></i>
                                </CButton>
                              </CTooltip>
                            )}
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </CTableBody>
            )}
          </CTable>
          {paginationComponent}
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
