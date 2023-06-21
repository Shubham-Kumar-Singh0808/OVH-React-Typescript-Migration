import React, { useEffect, useMemo, useState } from 'react'
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
  CFormSelect,
  CCol,
  CRow,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { TextDanger } from '../../../constant/ClassName'
import { SubCategoryList } from '../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'
import OToast from '../../../components/ReusableComponent/OToast'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'
import { currentPageData } from '../../../utils/paginationUtils'

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
  const [expensiveSubCategoryName, setSubCategoryName] = useState<string>('')
  const [isEditSubCategoryNameExist, setIsEditSubCategoryNameExist] =
    useState('')
  const dispatch = useAppDispatch()

  //   list of selectors
  const expenseCategoryList = useTypedSelector(
    reduxServices.subCategoryList.selectors.categories,
  )

  const subExpenseCategoryList = useTypedSelector(
    reduxServices.subCategoryList.selectors.subCategories,
  )
  const pageFromState = useTypedSelector(
    reduxServices.subCategoryList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.subCategoryList.selectors.pageSizeFromState,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )
  const editSubCategoryNameExists = (name: string) => {
    return subExpenseCategoryList?.find((subCategoryNamesExists) => {
      return (
        subCategoryNamesExists.subCategoryName.toLowerCase() ===
        name.toLowerCase()
      )
    })
  }
  //    Configuration for Pagination
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    subExpenseCategoryList.length,
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

  //Dispatching the Api's
  useEffect(() => {
    dispatch(reduxServices.subCategoryList.getCategoryList())
    dispatch(reduxServices.subCategoryList.getSubCategoryList())
    dispatch(reduxServices.subCategoryList.actions.setCurrentPage(1))
    dispatch(reduxServices.subCategoryList.actions.setPageSize(20))
  }, [dispatch])

  // Button Handlers

  const handleEditCategoryHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'subCategoryName') {
      const nameValue = value.replace(/[^a-zA-Z\s]$/gi, '')
      setEditExpenseSubCategoryDetails((prevState) => {
        return { ...prevState, ...{ [name]: nameValue } }
      })
    } else {
      setEditExpenseSubCategoryDetails((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
    if (editSubCategoryNameExists(value.trim())) {
      setIsEditSubCategoryNameExist(value.trim())
    } else {
      setIsEditSubCategoryNameExist('')
    }
  }

  const editExpenseCategoryButtonHandler = (
    subCategoryItems: SubCategoryList,
  ): void => {
    dispatch(
      reduxServices.subCategoryList.editExpenseSubCategoryList(
        subCategoryItems?.id,
      ),
    )
    setIsEditExpenseSubCategory(true)
    setDeleteExpenseSubCategoryId(subCategoryItems.id)
    setEditExpenseSubCategoryDetails(subCategoryItems)
  }

  const saveExpenseCategoryButtonHandler = async () => {
    const saveExpenseSubCategoryResultAction = await dispatch(
      reduxServices.subCategoryList.updateExpenseSubCategoryList(
        editExpenseSubCategoryDetails,
      ),
    )
    if (
      reduxServices.subCategoryList.updateExpenseSubCategoryList.fulfilled.match(
        saveExpenseSubCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.subCategoryList.getSubCategoryList())
      setIsEditExpenseSubCategory(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Sub-Category has been modified."
          />,
        ),
      )
    }
  }

  const onDeleteBtnClick = (
    deleteExpenseSubCategoryId: number,
    subCategoryName: string,
  ) => {
    setIsDeleteModalVisible(true)
    setSubCategoryName(subCategoryName)
    setDeleteExpenseSubCategoryId(deleteExpenseSubCategoryId)
  }
  const handleConfirmDeleteExpenseCategories = async () => {
    setIsDeleteModalVisible(false)
    const deleteExpenseSubCategoryResultAction = await dispatch(
      reduxServices.subCategoryList.deleteExpenseSubCategoryList(
        deleteExpenseSubCategoryId,
      ),
    )
    if (
      reduxServices.subCategoryList.deleteExpenseSubCategoryList.fulfilled.match(
        deleteExpenseSubCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.subCategoryList.getSubCategoryList())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Sub-Category deleted successfully"
          />,
        ),
      )
    }
  }

  useEffect(() => {
    if (
      editExpenseSubCategoryDetails?.subCategoryName?.replace(/^\s*/, '') &&
      editExpenseSubCategoryDetails.categoryName
    ) {
      setIsEditSubCategoryButtonEnabled(true)
    } else {
      setIsEditSubCategoryButtonEnabled(false)
    }
  }, [
    editExpenseSubCategoryDetails.subCategoryName,
    editExpenseSubCategoryDetails.categoryName,
  ])

  const cancelExpenseSubCategoryButtonHandler = () => {
    setIsEditExpenseSubCategory(false)
  }

  useEffect(() => {
    if (window.location.pathname === '/expenseSubCategory') {
      setCurrentPage(1)
    }
  }, [])

  const currentPageItems = useMemo(
    () => currentPageData(subExpenseCategoryList, currentPage, pageSize),
    [subExpenseCategoryList, currentPage, pageSize],
  )

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
          {currentPageItems?.length > 0 &&
            currentPageItems?.map((subCategoryItems, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  {isEditExpenseSubCategory &&
                  subCategoryItems.id === deleteExpenseSubCategoryId ? (
                    <CTableDataCell>
                      <CFormSelect
                        className="mb-1"
                        data-testid={`categoryId${index}`}
                        id="categoryNames"
                        size="sm"
                        aria-label="Category"
                        name="categoryName"
                        value={editExpenseSubCategoryDetails.categoryName}
                        onChange={handleEditCategoryHandler}
                      >
                        {expenseCategoryList &&
                          expenseCategoryList?.length > 0 &&
                          expenseCategoryList?.map((categoryNames, index) => (
                            <option
                              key={index}
                              value={categoryNames.categoryName}
                            >
                              {categoryNames.categoryName}
                            </option>
                          ))}
                      </CFormSelect>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="ng-binding">
                      {subCategoryItems.categoryName}
                    </CTableDataCell>
                  )}
                  {isEditExpenseSubCategory &&
                  subCategoryItems.id === deleteExpenseSubCategoryId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          data-testid={`subCategoryId${index}`}
                          className="form-leave"
                          type="text"
                          id="subCategoryNames"
                          name="subCategoryName"
                          maxLength={50}
                          value={editExpenseSubCategoryDetails?.subCategoryName}
                          onChange={handleEditCategoryHandler}
                        />
                        {isEditSubCategoryNameExist && (
                          <span
                            className={TextDanger}
                            data-testid="nameAlreadyExist"
                          >
                            <b>Sub-Category already exist</b>
                          </span>
                        )}
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell className="ng-binding">
                      {subCategoryItems.subCategoryName}
                    </CTableDataCell>
                  )}
                  <CTableDataCell scope="row">
                    {isEditExpenseSubCategory &&
                    subCategoryItems.id === deleteExpenseSubCategoryId ? (
                      <>
                        <CTooltip content="Save">
                          <CButton
                            color="success"
                            data-testid={`sh-save-btn${index}`}
                            className="btn-ovh me-1"
                            onClick={saveExpenseCategoryButtonHandler}
                            disabled={
                              isEditSubCategoryButtonEnabled
                                ? isEditSubCategoryButtonEnabled &&
                                  isEditSubCategoryNameExist.length > 0
                                : !isEditSubCategoryButtonEnabled
                            }
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Cancel">
                          <CButton
                            data-testid={`btn-cancel${index}`}
                            color="warning"
                            className="btn-ovh me-1"
                            onClick={cancelExpenseSubCategoryButtonHandler}
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
                              data-testid={`btn-subCategoryEdit${index}`}
                              color="info btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() => {
                                editExpenseCategoryButtonHandler(
                                  subCategoryItems,
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
                              data-testid={`btn-subCategoryDelete${index}`}
                              color="danger btn-ovh me-1"
                              className="btn-ovh-employee-list"
                              onClick={() =>
                                onDeleteBtnClick(
                                  subCategoryItems.id,
                                  subCategoryItems.subCategoryName,
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
          <strong data-testid="subCategoryRecords">
            {subExpenseCategoryList?.length
              ? `Total Records: ${subExpenseCategoryList.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {subExpenseCategoryList.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {subExpenseCategoryList.length > 20 && (
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
          Do you really want to delete this{' '}
          <strong> {expensiveSubCategoryName} </strong>
          Category?
        </>
      </OModal>
    </>
  )
}

export default ExpenseSubCategoryListTable
