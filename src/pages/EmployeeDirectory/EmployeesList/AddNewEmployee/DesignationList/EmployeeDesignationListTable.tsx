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
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import OModal from '../../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { currentPageData } from '../../../../../utils/paginationUtils'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { usePagination } from '../../../../../middleware/hooks/usePagination'
import { EmployeeDesignationListTableProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const EmployeeDesignationListTable = ({
  selectedDepartmentId,
}: EmployeeDesignationListTableProps): JSX.Element => {
  const employeeDesignations = useTypedSelector(
    reduxServices.employeeDesignation.selectors.employeeDesignations,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeDesignation.selectors.isLoading,
  )
  const pageFromState = useTypedSelector(
    reduxServices.employeeDesignation.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.employeeDesignation.selectors.pageSizeFromState,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToDesignationListActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Designation',
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    employeeDesignations.length,
    pageSizeFromState,
    pageFromState,
  )

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteDesignationName, setDeleteDesignationName] = useState('')
  const [deleteDesignationId, setDeleteDesignationId] = useState(0)

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
    designationId: number,
    designationName: string,
  ) => {
    setDeleteDesignationName(designationName)
    setDeleteDesignationId(designationId)
    setIsDeleteModalVisible(true)
  }

  const deleteToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Designation deleted successfully"
    />
  )

  const alreadyExistToastMessage = (
    <OToast
      toastColor="danger"
      toastMessage=" You can not delete this designation because of it is assigned to employee"
    />
  )
  const totalRecordsCount = employeeDesignations?.length
    ? `Total Records: ${employeeDesignations.length}`
    : `No Records Found`

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false)

    const deleteDesignationResultAction = await dispatch(
      reduxServices.employeeDesignation.deleteEmployeeDesignation(
        deleteDesignationId,
      ),
    )
    if (
      reduxServices.employeeDesignation.deleteEmployeeDesignation.fulfilled.match(
        deleteDesignationResultAction,
      )
    ) {
      dispatch(
        reduxServices.employeeDesignation.getEmployeeDesignations(
          selectedDepartmentId,
        ),
      )
      dispatch(reduxServices.app.actions.addToast(deleteToastElement))
    } else if (
      reduxServices.employeeDesignation.deleteEmployeeDesignation.rejected.match(
        deleteDesignationResultAction,
      ) &&
      deleteDesignationResultAction.payload === 406
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    }
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeDesignations, currentPage, pageSize),
    [employeeDesignations, currentPage, pageSize],
  )

  const getAllDesignations = selectedDepartmentId ? (
    <CTableBody>
      {currentPageItems?.map((designation, index) => (
        <CTableRow key={index}>
          <CTableHeaderCell scope="row">
            {getItemNumber(index)}
          </CTableHeaderCell>
          <CTableDataCell>{designation.departmentName}</CTableDataCell>
          <CTableDataCell>{designation.name}</CTableDataCell>
          <CTableDataCell>
            {userAccessToDesignationListActions?.deleteaccess && (
              <CTooltip content="Delete">
                <CButton
                  data-testid={`btn-delete${index}`}
                  color="danger"
                  size="sm"
                  className="btn-ovh me-1 btn-ovh-employee-list"
                  onClick={() =>
                    handleShowDeleteModal(
                      designation.id as number,
                      designation.name,
                    )
                  }
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTooltip>
            )}
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  ) : (
    <></>
  )
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CTable striped responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="w-35">
                  Department Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="w-30">
                  Designation Name
                </CTableHeaderCell>
                {userAccessToDesignationListActions?.deleteaccess && (
                  <CTableHeaderCell scope="col" className="w-20">
                    Action
                  </CTableHeaderCell>
                )}
              </CTableRow>
            </CTableHead>
            {getAllDesignations}
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>{totalRecordsCount}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {employeeDesignations.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {employeeDesignations.length > 20 && (
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
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Designation"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={() => handleConfirmDelete()}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{deleteDesignationName}</strong> Designation ?
        </>
      </OModal>
    </>
  )
}

export default EmployeeDesignationListTable
