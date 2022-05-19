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
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import {
  qualificationCategorySelectors,
  qualificationCategoryThunk,
} from '../../../reducers/MyProfile/QualificationCategoryList/qualificationCategorySlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { appActions } from '../../../reducers/appSlice'
import { cilTrash } from '@coreui/icons'
import { currentPageData } from '../../../utils/paginationUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'

const QualificationCategoryListTable = (): JSX.Element => {
  const qualificationCategories = useTypedSelector(
    qualificationCategorySelectors.selectQualificationCategoryList,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(qualificationCategories.length, 20)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [
    toDeleteQualificationCategoryName,
    setToDeleteQualificationCategoryName,
  ] = useState('')
  const [toDeleteQualificationCategoryId, setToDeleteQualificationCategoryId] =
    useState(0)

  useEffect(() => {
    setPageSize(20)
  }, [qualificationCategories, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowDeleteModal = (
    qualificationCategoryName: string,
    qualificationCategoryId: number,
  ) => {
    setToDeleteQualificationCategoryName(qualificationCategoryName)
    setToDeleteQualificationCategoryId(qualificationCategoryId)
    setIsDeleteModalVisible(true)
  }

  const deleteToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Qualification details deleted successfully."
    />
  )
  const handleConfirmDelete = async (id: number) => {
    setIsDeleteModalVisible(false)

    const deleteQualificationCategoryResultAction = await dispatch(
      qualificationCategoryThunk.removeQualificationCategoryById(id),
    )
    if (
      qualificationCategoryThunk.removeQualificationCategoryById.fulfilled.match(
        deleteQualificationCategoryResultAction,
      )
    ) {
      dispatch(qualificationCategoryThunk.getQualificationCategories())
      dispatch(appActions.addToast(deleteToastElement))
    }
  }
  const currentPageItems = useMemo(
    () => currentPageData(qualificationCategories, currentPage, pageSize),
    [qualificationCategories, currentPage, pageSize],
  )

  return (
    <>
      {qualificationCategories.length ? (
        <>
          <CTable striped>
            <CTableHead>
              <CTableRow className="align-items-start">
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Qualification Category
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Qualification Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPageItems.map((qualificationCategory, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      {getItemNumber(index)}
                    </CTableHeaderCell>
                    <CTableDataCell>
                      {qualificationCategory.qualificationCategory}
                    </CTableDataCell>
                    <CTableDataCell>
                      {qualificationCategory.qualificationName}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() =>
                          handleShowDeleteModal(
                            qualificationCategory.qualificationCategory,
                            qualificationCategory.id as number,
                          )
                        }
                      >
                        <CIcon className="text-white" icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {qualificationCategories.length}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {qualificationCategories.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                />
              )}
            </CCol>
            {qualificationCategories.length > 20 && (
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
      ) : (
        <CCol>
          <CRow className="category-no-data">
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
      <OModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Qualification Category"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={() =>
          handleConfirmDelete(toDeleteQualificationCategoryId)
        }
      >
        {`Are you sure you want to delete this ${toDeleteQualificationCategoryName} Category item?`}
      </OModal>
    </>
  )
}

export default QualificationCategoryListTable
