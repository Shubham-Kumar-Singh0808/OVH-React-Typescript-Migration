import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { TextDanger } from '../../../constant/ClassName'
import { SubCategoryList } from '../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'

const ExpenseSubCategoryListTable = (): JSX.Element => {
  const initialEditExpenseSubCategories = {} as SubCategoryList
  const [editExpenseSubCategoryDetails, setEditExpenseSubCategoryDetails] =
    useState(initialEditExpenseSubCategories)
  const [isEditExpenseSubCategory, setIsEditExpenseSubCategory] =
    useState<boolean>(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteExpenseSubCategoryId, setDeleteExpenseSubCategoryId] =
    useState(0)
  const [isEditSubCategoryButtonEnabled, setIsEditSubCategoryButtonEnabled] =
    useState(false)
  const [subCategoryName, setSubCategoryName] = useState<string>('')
  const [isEditSubCategoryNameExist, setIsEditSubCategoryNameExist] =
    useState('')
  const dispatch = useAppDispatch()

  //   list of selectors
  const expenseCategoryList = useTypedSelector(
    reduxServices.subCategory.selectors.categories,
  )

  const subExpenseCategoryList = useTypedSelector(
    reduxServices.subCategory.selectors.subCategories,
  )
  const pageFromState = useTypedSelector(
    reduxServices.subCategory.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.subCategory.selectors.pageSizeFromState,
  )

  //    Configuration for Pagination
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    expenseCategoryList.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  useEffect(() => {
    dispatch(reduxServices.subCategory.getCategoryList())
    dispatch(reduxServices.subCategory.getSubCategoryList())
    dispatch(reduxServices.subCategory.actions.setCurrentPage(1))
    dispatch(reduxServices.subCategory.actions.setPageSize(20))
  }, [dispatch])

  return (
    <>
      <CTable className="mt-4 mb-4">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Sub-Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {subExpenseCategoryList?.length > 0 &&
            subExpenseCategoryList?.map((subCategoryItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {subCategoryItems.categoryName}
                  </CTableDataCell>
                  <CTableDataCell className="ng-binding">
                    {subCategoryItems.subCategoryName}
                  </CTableDataCell>

                  {/* {isEditExpenseCategory &&
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
                  )} */}
                  {/* <CTableDataCell scope="row">
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
                  </CTableDataCell> */}
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ExpenseSubCategoryListTable
