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
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { currentPageData } from '../../../../utils/paginationUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'

const QualificationCategoryListTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [
    toDeleteQualificationCategoryName,
    setToDeleteQualificationCategoryName,
  ] = useState('')
  const [toDeleteQualificationCategoryId, setToDeleteQualificationCategoryId] =
    useState(0)

  const qualificationCategories = useTypedSelector(
    reduxServices.employeeQualificationCategory.selectors
      .qualificationCategories,
  )

  const pageFromState = useTypedSelector(
    reduxServices.employeeQualificationCategory.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.employeeQualificationCategory.selectors.pageSizeFromState,
  )

  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    qualificationCategories.length,
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

  const alreadyExistToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage="This qualification details are already used in qualification, So you cannot delete."
    />
  )
  const handleConfirmDelete = async (id: number) => {
    setIsDeleteModalVisible(false)

    dispatch(reduxServices.category.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.category.actions.setPageSize(pageSize))
    const deleteQualificationCategoryResultAction = await dispatch(
      reduxServices.employeeQualificationCategory.deleteQualificationCategory(
        id,
      ),
    )
    if (
      reduxServices.employeeQualificationCategory.deleteQualificationCategory.fulfilled.match(
        deleteQualificationCategoryResultAction,
      )
    ) {
      dispatch(
        reduxServices.employeeQualificationCategory.getQualificationCategories(),
      )
      dispatch(reduxServices.app.actions.addToast(deleteToastElement))
    } else if (
      reduxServices.employeeQualificationCategory.deleteQualificationCategory.rejected.match(
        deleteQualificationCategoryResultAction,
      ) &&
      deleteQualificationCategoryResultAction.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    }
  }
  const currentPageItems = useMemo(
    () => currentPageData(qualificationCategories, currentPage, pageSize),
    [qualificationCategories, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow className="align-items-start">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Qualification Category
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Qualification Name</CTableHeaderCell>
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
                  <CTooltip content="Delete">
                    <CButton
                      data-testid={`btn-delete${index}`}
                      size="sm"
                      color="danger btn-ovh me-1"
                      className="btn-ovh-employee-list"
                      onClick={() =>
                        handleShowDeleteModal(
                          qualificationCategory.qualificationCategory,
                          qualificationCategory.id as number,
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
          <p>
            <strong>Total Records: {qualificationCategories.length}</strong>
          </p>
        </CCol>
        {!qualificationCategories.length && (
          <CCol>
            <CRow>
              <h4 className="text-center">No data to display</h4>
            </CRow>
          </CCol>
        )}
        <CCol xs={3}>
          {qualificationCategories.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
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
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Qualification Category"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
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
