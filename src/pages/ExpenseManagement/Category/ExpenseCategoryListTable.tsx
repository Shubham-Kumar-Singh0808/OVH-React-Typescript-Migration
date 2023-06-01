import React, { useEffect, useState } from 'react'
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
import { CategoryListTableProps } from '../../../types/ExpenseManagement/Category/categoryListTypes'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { EditCategory } from '../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'
import OToast from '../../../components/ReusableComponent/OToast'
import OModal from '../../../components/ReusableComponent/OModal'
import { TextDanger } from '../../../constant/ClassName'

const ExpenseCategoryListTable = ({
  userAccess,
}: CategoryListTableProps): JSX.Element => {
  const initialEditExpenseCategories = {} as EditCategory
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
    return categoryList?.find((categoryName) => {
      return categoryName.categoryName.toLowerCase() === name.toLowerCase()
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
      const nameValue = value.replace(/[^a-zA-Z\s]$/gi, '')
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
    id: number,
    categoryName: string,
    createdBy: string,
    updatedBy: string | null,
    createdDate: string,
    updatedDate: string | null,
    // eslint-disable-next-line max-params
  ): void => {
    setIsEditExpenseCategory(true)
    setDeleteExpenseCategoryId(id)
    setEditExpenseCategoryDetails({
      id,
      categoryName,
      createdBy,
      updatedBy,
      createdDate,
      updatedDate,
    })
  }
  const saveExpenseCategoryButtonHandler = async () => {
    const saveExpenseCategoryResultAction = await dispatch(
      reduxServices.addNewCategory.updateExpenseCategory(
        editExpenseCategoryDetails,
      ),
    )
    if (
      reduxServices.addNewCategory.updateExpenseCategory.fulfilled.match(
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
    } else if (
      reduxServices.addNewCategory.updateExpenseCategory.rejected.match(
        saveExpenseCategoryResultAction,
      ) &&
      saveExpenseCategoryResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="Category is already exists."
          />,
        ),
      )
    }
  }

  const onDeleteBtnClick = (
    deleteExpenseCategoryId: number,
    categoryName: string,
  ) => {
    setIsDeleteModalVisible(true)
    setCategoryName(categoryName)
    setDeleteExpenseCategoryId(deleteExpenseCategoryId)
  }
  const handleConfirmDeleteExpenseCategories = async () => {
    setIsDeleteModalVisible(false)
    const deleteExpenseCategoryResultAction = await dispatch(
      reduxServices.addNewCategory.deleteExpenseCategory(
        deleteExpenseCategoryId,
      ),
    )
    if (
      reduxServices.addNewCategory.deleteExpenseCategory.fulfilled.match(
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

  return (
    <>
      <CTable className="mt-4 mb-4">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categoryList?.length > 0 &&
            categoryList?.map((categoryItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  {isEditExpenseCategory &&
                  categoryItems.id === deleteExpenseCategoryId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          className="form-leave"
                          type="text"
                          id="name"
                          name="categoryName"
                          value={editExpenseCategoryDetails?.categoryName}
                          onChange={handleEditCategoryHandler}
                        />
                        {isEditCategoryNameExist && (
                          <span
                            className={TextDanger}
                            data-testid="nameAlreadyExist"
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
                        <CButton
                          color="success"
                          data-testid={`sh-save-btn${index}`}
                          className="btn-ovh me-1"
                          onClick={saveExpenseCategoryButtonHandler}
                          disabled={
                            isEditCategoryButtonEnabled
                              ? isEditCategoryButtonEnabled &&
                                isEditCategoryNameExist.length > 0
                              : !isEditCategoryButtonEnabled
                          }
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>
                        </CButton>
                        <CTooltip content="Cancel">
                          <CButton
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
                              color="info btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() => {
                                editExpenseCategoryButtonHandler(
                                  categoryItems.id,
                                  categoryItems.categoryName,
                                  categoryItems.createdBy,
                                  categoryItems.updatedBy,
                                  categoryItems.createdDate,
                                  categoryItems.updatedDate,
                                )
                              }}
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        )}
                        {userAccess?.deleteaccess && (
                          <CTooltip content="Delete">
                            <CButton
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
          <strong>
            {categoryList?.length
              ? `Total Records: ${categoryList.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {categoryList.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
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
