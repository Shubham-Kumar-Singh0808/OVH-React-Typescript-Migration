/* eslint-disable require-await */
// Todd: remove eslint and fix error
import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OToast from '../../../components/ReusableComponent/OToast'

const CategoryListTable = (): JSX.Element => {
  const categories = useTypedSelector(
    reduxServices.category.selectors.categories,
  )
  const pageFromState = useTypedSelector(
    reduxServices.category.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.category.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(categories.length, pageSizeFromState, pageFromState)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteCategoryName, setToDeleteCategoryName] = useState('')
  const [toDeleteCategoryId, setToDeleteCategoryId] = useState(0)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowDeleteModal = (categoryName: string, categoryId: number) => {
    setToDeleteCategoryName(categoryName)
    setToDeleteCategoryId(categoryId)
    setIsDeleteModalVisible(true)
  }

  const SuccessToastMessage = (
    <OToast toastMessage="Category Deleted Successfully" toastColor="success" />
  )

  const handleConfirmDelete = async (categoryId: number) => {
    setIsDeleteModalVisible(false)

    dispatch(reduxServices.category.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.category.actions.setPageSize(pageSize))
    dispatch(reduxServices.category.deleteCategory(categoryId))
    dispatch(reduxServices.category.getAllCategories())
    dispatch(reduxServices.app.actions.addToast(SuccessToastMessage))
  }

  const currentPageItems = useMemo(
    () => currentPageData(categories, currentPage, pageSize),
    [categories, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-25">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-50">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((category, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{category.categoryType}</CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Delete">
                    <CButton
                      data-testid={`category-delete-btn${index}`}
                      size="sm"
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      onClick={() =>
                        handleShowDeleteModal(
                          category.categoryType,
                          category.categoryId,
                        )
                      }
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTooltip>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {categories?.length
              ? `Total Records: ${categories.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {categories.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {categories.length > 20 && (
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
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Category"
        confirmButtonText="Delete"
        closeButtonClass="d-none"
        confirmButtonAction={() => handleConfirmDelete(toDeleteCategoryId)}
        alignment="center"
        modalBodyClass="mt-0"
      >
        <>
          Are you sure you want to delete this{' '}
          <strong>{toDeleteCategoryName}</strong> category item?
        </>
      </OModal>
    </>
  )
}

export default CategoryListTable
