import React, { useEffect, useMemo, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
  CTooltip,
  CFormInput,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { CategoryList } from '../../../types/ExpenseManagement/Category/categoryListTypes'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OToast from '../../../components/ReusableComponent/OToast'
import OModal from '../../../components/ReusableComponent/OModal'
import { TextDanger } from '../../../constant/ClassName'
import { currentPageData } from '../../../utils/paginationUtils'

const ExpenseCategoryListTable = (): JSX.Element => {
  const initialEditExpenseCategories = {} as CategoryList
  const [editExpenseCategoryDetails, setEditExpenseCategoryDetails] = useState(
    initialEditExpenseCategories,
  )
  const [isEditExpenseCategory, setIsEditExpenseCategory] =
    useState<boolean>(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteExpenseCategoryId, setDeleteExpenseCategoryId] = useState(0)
  const [isEditCategoryButtonEnabled, setIsEditCategoryButtonEnabled] =
    useState(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [isEditCategoryNameExist, setIsEditCategoryNameExist] = useState('')

  const dispatch = useAppDispatch()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  const categoryList = useTypedSelector(
    reduxServices.categoryList.selectors.categories,
  )
  const pageFromState = useTypedSelector(
    reduxServices.categoryList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.categoryList.selectors.pageSizeFromState,
  )

  const editCategoryNameExists = (name: string) => {
    return categoryList?.find((categories) => {
      return categories.categoryName.toLowerCase() === name.toLowerCase()
    })
  }

  useEffect(() => {
    if (editExpenseCategoryDetails?.categoryName?.replace(/^\s*/, '')) {
      setIsEditCategoryButtonEnabled(true)
    } else {
      setIsEditCategoryButtonEnabled(false)
    }
  }, [editExpenseCategoryDetails.categoryName])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(categoryList.length, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleEditCategoryHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'categoryName') {
      const nameValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setEditExpenseCategoryDetails((prevState) => {
        return { ...prevState, ...{ [name]: nameValue } }
      })
    } else {
      setEditExpenseCategoryDetails((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
    if (editCategoryNameExists(value.trim())) {
      setIsEditCategoryNameExist(value.trim())
    } else {
      setIsEditCategoryNameExist('')
    }
  }

  const editExpenseCategoryButtonHandler = (
    expensiveCategoryItems: CategoryList,
  ): void => {
    dispatch(
      reduxServices.categoryList.editExpenseCategory(
        expensiveCategoryItems?.id,
      ),
    )
    setIsEditExpenseCategory(true)
    setDeleteExpenseCategoryId(expensiveCategoryItems.id)
    setEditExpenseCategoryDetails(expensiveCategoryItems)
  }
  const saveExpenseCategoryButtonHandler = async () => {
    const saveExpenseCategoryResultAction = await dispatch(
      reduxServices.categoryList.updateExpenseCategory(
        editExpenseCategoryDetails,
      ),
    )
    if (
      reduxServices.categoryList.updateExpenseCategory.fulfilled.match(
        saveExpenseCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.categoryList.getCategoryList())
      setIsEditExpenseCategory(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Category has been modified."
          />,
        ),
      )
    }
  }

  const onDeleteBtnClick = (
    deletesExpenseCategoryId: number,
    categoryNames: string,
  ) => {
    setIsDeleteModalVisible(true)
    setCategoryName(categoryNames)
    setDeleteExpenseCategoryId(deletesExpenseCategoryId)
  }
  const handleConfirmDeleteExpenseCategories = async () => {
    setIsDeleteModalVisible(false)
    const deleteExpenseCategoryResultAction = await dispatch(
      reduxServices.categoryList.deleteExpenseCategory(deleteExpenseCategoryId),
    )
    if (
      reduxServices.categoryList.deleteExpenseCategory.fulfilled.match(
        deleteExpenseCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.categoryList.getCategoryList())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Category deleted successfully"
          />,
        ),
      )
    }
  }

  const cancelLeaveCategoryButtonHandler = () => {
    setIsEditExpenseCategory(false)
  }

  useEffect(() => {
    if (categoryName) {
      setIsEditCategoryButtonEnabled(true)
    } else {
      setIsEditCategoryButtonEnabled(false)
    }
  }, [categoryName])

  useEffect(() => {
    dispatch(reduxServices.categoryList.getCategoryList())
    dispatch(reduxServices.category.actions.setCurrentPage(1))
    dispatch(reduxServices.category.actions.setPageSize(20))
  }, [dispatch])

  const categoryListPageItems = useMemo(
    () => currentPageData(categoryList, currentPage, pageSize),
    [categoryList, currentPage, pageSize],
  )

  useEffect(() => {
    if (window.location.pathname === '/expenseCategory') {
      setCurrentPage(1)
    }
  }, [])

  return (
    <>
      <CTable className="mt-4 mb-4" align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categoryListPageItems?.length > 0 &&
            categoryListPageItems?.map((categoryItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  {isEditExpenseCategory &&
                  categoryItems.id === deleteExpenseCategoryId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          data-testid={`categoryName${index}`}
                          className="sm"
                          type="text"
                          id="name"
                          name="categoryName"
                          value={editExpenseCategoryDetails?.categoryName}
                          onChange={handleEditCategoryHandler}
                        />
                        {isEditCategoryNameExist && (
                          <span
                            className={TextDanger}
                            data-testid="categoryNameAlreadyExist"
                          >
                            <b>Category already exist</b>
                          </span>
                        )}
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="ng-binding">
                      {categoryItems.categoryName}
                    </CTableDataCell>
                  )}
                  <CTableDataCell scope="row">
                    {isEditExpenseCategory &&
                    categoryItems.id === deleteExpenseCategoryId ? (
                      <>
                        <CTooltip content="Save">
                          <CButton
                            color="success"
                            data-testid={`save-btn${index}`}
                            className="btn-ovh me-1"
                            onClick={saveExpenseCategoryButtonHandler}
                            disabled={!isEditCategoryButtonEnabled}
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Cancel">
                          <CButton
                            data-testid={`cancel-btn${index}`}
                            color="warning"
                            className="btn-ovh me-1"
                            onClick={cancelLeaveCategoryButtonHandler}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </>
                    ) : (
                      <>
                        {userAccess?.updateaccess && (
                          <CTooltip content="Edit">
                            <CButton
                              data-testid={`btn-categoryEdit${index}`}
                              color="info btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() => {
                                editExpenseCategoryButtonHandler(categoryItems)
                              }}
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        )}
                        {userAccess?.deleteaccess && (
                          <CTooltip content="Delete">
                            <CButton
                              data-testid={`btn-categoryDelete${index}`}
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() =>
                                onDeleteBtnClick(
                                  categoryItems.id,
                                  categoryItems.categoryName,
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
          <strong data-testid="records">
            {categoryList?.length
              ? `Total Records: ${categoryList.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {categoryList.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {categoryList.length > 20 && (
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
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteExpenseCategories}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong> {categoryName} </strong>
          Category?
        </>
      </OModal>
    </>
  )
}

export default ExpenseCategoryListTable
