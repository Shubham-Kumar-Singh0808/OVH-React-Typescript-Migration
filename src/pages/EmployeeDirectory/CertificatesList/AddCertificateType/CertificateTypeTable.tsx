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
import React, { useMemo, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import EditCertificateType from './EditCertificateType'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../../utils/paginationUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const CertificateTypeTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [certificateId, setCertificateId] = useState(0)
  const [isEditCertificateType, setIsEditCertificateType] =
    useState<boolean>(false)
  const [toDeleteCertificate, setToDeleteCertificate] = useState('')

  const certificateTypes = useTypedSelector(
    reduxServices.certificateType.selectors.certificateTypes,
  )
  const pageFromState = useTypedSelector(
    reduxServices.certificateType.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.certificateType.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(certificateTypes.length, pageSizeFromState, pageFromState)

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
    certificateTypeId: number,
    certificate: string,
  ) => {
    setCertificateId(certificateTypeId)
    setToDeleteCertificate(certificate)
    setIsEditCertificateType(false)
    setIsDeleteModalVisible(true)
  }

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="CertificateType deleted successfully"
    />
  )

  const handleConfirmDeleteCertificateType = async () => {
    setIsDeleteModalVisible(false)
    dispatch(reduxServices.certificateType.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.certificateType.actions.setPageSize(pageSize))

    const deleteCertificateTypeResultAction = await dispatch(
      reduxServices.certificateType.deleteCertificateType(certificateId),
    )
    if (
      reduxServices.certificateType.deleteCertificateType.fulfilled.match(
        deleteCertificateTypeResultAction,
      )
    ) {
      dispatch(reduxServices.certificateType.getCertificateTypes())
      dispatch(reduxServices.app.actions.addToast(toastElement))
    }
  }

  const editCertificateTypeButtonHandler = async (
    id: number,
  ): Promise<void> => {
    await dispatch(reduxServices.certificateType.getCertificateType(id))
    setIsEditCertificateType(true)
    setCertificateId(id)
  }

  const cancelCertificateTypeButtonHandler = () => {
    setIsEditCertificateType(false)
  }
  const isLoading = useTypedSelector(
    reduxServices.certificateType.selectors.isLoading,
  )

  const currentPageItems = useMemo(
    () => currentPageData(certificateTypes, currentPage, pageSize),
    [certificateTypes, currentPage, pageSize],
  )

  return (
    <>
      {certificateTypes.length ? (
        <>
          <CTable striped responsive>
            <CTableHead>
              <CTableRow className="align-items-start">
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
                <CTableHeaderCell scope="col">Certificate</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPageItems.map((certificateTypeItem, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      {' '}
                      {getItemNumber(index)}
                    </CTableDataCell>
                    {isEditCertificateType &&
                    certificateId === certificateTypeItem.id ? (
                      <EditCertificateType
                        cancelCertificateTypeButtonHandler={
                          cancelCertificateTypeButtonHandler
                        }
                        setIsEditCertificateType={setIsEditCertificateType}
                        isEditCertificateType={isEditCertificateType}
                      />
                    ) : (
                      <>
                        <CTableDataCell>
                          {certificateTypeItem.technologyName}
                        </CTableDataCell>
                        <CTableDataCell>
                          {certificateTypeItem.certificateType}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {!isEditCertificateType && (
                            <>
                              <CButton
                                data-testid={`btn-edit${index}`}
                                color="info"
                                size="sm"
                                className="btn-ovh me-1"
                                onClick={() => {
                                  editCertificateTypeButtonHandler(
                                    certificateTypeItem.id as number,
                                  )
                                }}
                              >
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                              <CButton
                                data-testid={`btn-delete${index}`}
                                color="danger"
                                size="sm"
                                onClick={() =>
                                  handleShowDeleteModal(
                                    certificateTypeItem.id as number,
                                    certificateTypeItem.certificateType,
                                  )
                                }
                              >
                                <CIcon className="text-white" icon={cilTrash} />
                              </CButton>
                            </>
                          )}
                        </CTableDataCell>
                      </>
                    )}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {certificateTypes.length}</strong>
              </p>
            </CCol>
            {!certificateTypes.length && (
              <CCol>
                <CRow>
                  <h4 className="text-center">No data to display</h4>
                </CRow>
              </CCol>
            )}
            <CCol xs={3}>
              {certificateTypes.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {certificateTypes.length > 20 && (
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
          <CRow>
            {isLoading !== ApiLoadingState.loading && (
              <h4 className="text-center">No data to display</h4>
            )}
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        modalTitle="Delete Certificate Type"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteCertificateType}
      >
        {`Do you really want to delete this ${toDeleteCertificate} Certificate ?`}
      </OModal>
    </>
  )
}
export default CertificateTypeTable
