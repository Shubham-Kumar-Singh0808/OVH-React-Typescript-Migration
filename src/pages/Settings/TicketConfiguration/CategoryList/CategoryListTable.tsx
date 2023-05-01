import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { Category } from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'
import { TextDanger } from '../../../../constant/ClassName'
import { currentPageData } from '../../../../utils/paginationUtils'

const CategoryListTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteTicketCategoryName, setToDeleteTicketCategoryName] =
    useState('')
  const [toDeleteTicketCategoryId, setToDeleteTicketCategoryId] = useState(0)
  const [selectCategoryId, setSelectCategoryId] = useState<number>(0)
  const [isCategoryDetailsEdit, setIsCategoryDetailsEdit] =
    useState<boolean>(false)
  const [isCategoryNameExist, setIsCategoryNameExist] = useState('')
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState<boolean>(false)
  const [editCategory, setEditCategory] = useState<Category>({
    categoryId: 0,
    categoryName: '0',
    departmentId: 0,
    departmentName: '',
    mealType: false,
  })
  const dispatch = useAppDispatch()
  const ticketCategories = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categoryList,
  )
  const categoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categoryList,
  )
  const pageFromState = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.pageSizeFromState,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToMealTypeCol = userAccessToFeatures?.find(
    (feature) => feature.name === 'Meal Type',
  )
  const userAccessToCategoryActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Ticket Configuration',
  )
  const tableHeaderCellPropsCategoryName = {
    width: '40%',
    scope: 'col',
  }
  const tableHeaderCellPropsDepartmentName = {
    width: '20%',
    scope: 'col',
  }
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(ticketCategories?.length, pageSizeFromState, pageFromState)

  const handleCategoryPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(ticketCategories, currentPage, pageSize),
    [ticketCategories, currentPage, pageSize],
  )

  const handleShowCategoryDeleteModal = (
    categoryName: string,
    categoryId: number,
  ) => {
    setToDeleteTicketCategoryName(categoryName)
    setToDeleteTicketCategoryId(categoryId)
    setIsDeleteModalVisible(true)
  }

  const actionMapping = {
    updated: 'updated',
    deleted: 'deleted',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Category ${action} successfully`}
      />
    )
  }
  const categoryNameAlreadyExists = (name: string) => {
    return categoryList?.find((category) => {
      return category.categoryName.toLowerCase() === name.toLowerCase()
    })
  }
  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false)
    const deleteCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.deleteCategory(
        toDeleteTicketCategoryId,
      ),
    )
    if (
      reduxServices.ticketConfiguration.deleteCategory.fulfilled.match(
        deleteCategoryResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.deleted),
        ),
      )
      dispatch(
        reduxServices.ticketConfiguration.actions.setCurrentPage(currentPage),
      )
      dispatch(reduxServices.ticketConfiguration.actions.setPageSize(pageSize))
      dispatch(reduxServices.ticketConfiguration.getAllCategory())
    }
  }
  const updateCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
    setEditCategory((prevState) => {
      return { ...prevState, ...{ [name]: newValue } }
    })
    if (categoryNameAlreadyExists(value)) {
      setIsCategoryNameExist(value)
    } else {
      setIsCategoryNameExist('')
    }
  }

  const editCategoryButtonHandler = (editCategoryData: Category): void => {
    setIsCategoryDetailsEdit(true)
    setIsCategoryNameExist('')
    setSelectCategoryId(editCategoryData.categoryId)
    setEditCategory({
      categoryId: editCategoryData.categoryId,
      categoryName: editCategoryData.categoryName,
      departmentId: editCategoryData.departmentId,
      departmentName: editCategoryData.departmentName,
      mealType: editCategoryData.mealType,
    })
  }
  useEffect(() => {
    if (editCategory.categoryName && !isCategoryNameExist) {
      setIsSaveButtonEnabled(true)
    } else {
      setIsSaveButtonEnabled(false)
    }
  }, [editCategory.categoryName, isCategoryNameExist])

  const saveCategoryButtonHandler = async () => {
    const updateCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.updateCategory(editCategory),
    )
    if (
      reduxServices.ticketConfiguration.updateCategory.fulfilled.match(
        updateCategoryResultAction,
      )
    ) {
      await dispatch(reduxServices.ticketConfiguration.getAllCategory())
      setIsCategoryDetailsEdit(false)
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated),
        ),
      )
    }
  }

  const handleCancelUpdate = () => {
    setIsCategoryDetailsEdit(false)
  }

  return (
    <>
      <CTable striped align="middle">
        <CTableHead>
          <CTableRow className="align-items-start">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department Name</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsCategoryName}>
              Category Name
            </CTableHeaderCell>
            {userAccessToMealTypeCol?.viewaccess && (
              <CTableHeaderCell {...tableHeaderCellPropsDepartmentName}>
                Meal Type
              </CTableHeaderCell>
            )}
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems?.map((ticketCategory, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{ticketCategory.departmentName}</CTableDataCell>
                {isCategoryDetailsEdit &&
                ticketCategory.categoryId === selectCategoryId ? (
                  <CTableDataCell scope="row">
                    <CCol sm={12} className="d-flex">
                      <CFormInput
                        className="eventType-editInput"
                        type="text"
                        id="categoryName"
                        data-testid="categoryName-input"
                        size="sm"
                        name="categoryName"
                        autoComplete="off"
                        value={editCategory.categoryName}
                        onChange={updateCategoryHandler}
                      />
                      <CCol sm={7} className="ms-2 mt-1">
                        {isCategoryNameExist && (
                          <p
                            className={TextDanger}
                            data-testid="categoryName-exist"
                          >
                            Category Name Already Exist
                          </p>
                        )}
                      </CCol>
                    </CCol>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>{ticketCategory.categoryName}</CTableDataCell>
                )}
                {userAccessToMealTypeCol?.viewaccess && (
                  <CTableDataCell>
                    <span className="hidden-block sh-tracker-checkbox">
                      <CFormCheck
                        className="form-check-input form-select-not-allowed"
                        name="mealType"
                        checked={ticketCategory.mealType}
                        disabled={true}
                      />
                    </span>
                  </CTableDataCell>
                )}
                <CTableDataCell scope="row">
                  {isCategoryDetailsEdit &&
                  ticketCategory.categoryId === selectCategoryId ? (
                    <>
                      <CTooltip content="Save">
                        <CButton
                          color="success"
                          data-testid={`sh-save-btn${index}`}
                          className="btn-ovh me-1 btn-ovh-employee-list"
                          disabled={!isSaveButtonEnabled}
                          onClick={saveCategoryButtonHandler}
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                      <CTooltip content="Cancel">
                        <CButton
                          className="btn-ovh-employee-list cursor-pointer"
                          color="danger btn-ovh me-1"
                          data-testid="cl-cancel-btn"
                          onClick={handleCancelUpdate}
                        >
                          <i
                            className="fa fa-times text-white sh-fa-times"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>
                    </>
                  ) : (
                    <>
                      {userAccessToCategoryActions?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            data-testid={`cl-edit-btn${index}`}
                            onClick={() => {
                              editCategoryButtonHandler({
                                categoryId: ticketCategory.categoryId,
                                categoryName: ticketCategory.categoryName,
                                departmentId: ticketCategory.departmentId,
                                departmentName: ticketCategory.departmentName,
                                mealType: ticketCategory.mealType,
                              })
                            }}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccessToCategoryActions?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() =>
                              handleShowCategoryDeleteModal(
                                ticketCategory.categoryName,
                                ticketCategory.categoryId,
                              )
                            }
                            data-testid={`cl-delete-btn${index}`}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {ticketCategories?.length
              ? `Total Records: ${ticketCategories.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {ticketCategories?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handleCategoryPageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {ticketCategories?.length > 20 && (
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
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Category"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDelete}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteTicketCategoryName}</strong> Category ?
        </>
      </OModal>
    </>
  )
}

export default CategoryListTable
