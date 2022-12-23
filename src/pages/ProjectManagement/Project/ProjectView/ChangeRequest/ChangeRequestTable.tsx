import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { usePagination } from '../../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ChangeRequestTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteChangeRequest, setToDeleteChangeRequest] = useState(0)
  const changeRequestList = useTypedSelector(
    reduxServices.projectChangeRequest.selectors.projectChangeRequest,
  )
  const changeRequestSize = useTypedSelector(
    reduxServices.projectChangeRequest.selectors.projectChangeRequestSize,
  )
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.projectChangeRequest.selectors.isLoading,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(changeRequestSize, 20)
  const { projectId } = useParams<{ projectId: string }>()
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleShowDeleteModal = (skillId: number) => {
    setToDeleteChangeRequest(skillId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteChangeRequest = async () => {
    setIsDeleteModalVisible(false)
    const deleteChangeRequestResultAction = await dispatch(
      reduxServices.projectChangeRequest.deleteChangeRequest(
        toDeleteChangeRequest,
      ),
    )
    const toastElement = (
      <OToast toastMessage="CR Deleted Successfully" toastColor={'success'} />
    )
    if (
      reduxServices.projectChangeRequest.deleteChangeRequest.fulfilled.match(
        deleteChangeRequestResultAction,
      )
    ) {
      dispatch(
        reduxServices.projectChangeRequest.getProjectChangeRequestList({
          endIndex: pageSize * currentPage,
          firstIndex: pageSize * (currentPage - 1),
          projectid: projectId as string,
        }),
      )
      dispatch(dispatch(reduxServices.app.actions.addToast(toastElement)))
    }
  }
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            changeRequestList.length > 0 &&
            changeRequestList?.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.duration}</CTableDataCell>
                  <CTableDataCell>{item.descripition}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                      onClick={() => handleShowDeleteModal(item.id)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {changeRequestList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {changeRequestSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {changeRequestSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {changeRequestSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
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
        <CCol>
          <CRow className="mt-4 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Change Request"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteChangeRequest}
      >
        {`Do you really want to delete this ?`}
      </OModal>
    </>
  )
}

export default ChangeRequestTable
