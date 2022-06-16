import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { currentPageData } from '../../../../utils/paginationUtils'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import OModal from '../../../../components/ReusableComponent/OModal'
import { CertificateType } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
const CertificateTypeTable = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [certificateId, setCertificateId] = useState(0)
  const [isEditCertificateType, setIsEditCertificateType] =
    useState<boolean>(false)
  const [editCertificateTypeDetails, setEditCertificateTypeDetails] =
    useState<CertificateType>({
      id: 0,
      technologyId: 0,
      technologyName: '',
      certificateType: '',
      technology: '',
    })
  const certificateTypes = useTypedSelector(
    reduxServices.certificateType.selectors.certificateTypes,
  )
  const getAllTechnology = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.certificateType.getCertificateTypes())
  }, [dispatch])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(certificateTypes.length, 20)

  useEffect(() => {
    setPageSize(20)
  }, [certificateTypes, setPageSize, setCurrentPage])
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(certificateTypes, currentPage, pageSize),
    [certificateTypes, currentPage, pageSize],
  )

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Certificate deleted successfully"
    />
  )

  const handleShowDeleteModal = (certificateTypeId: number) => {
    setCertificateId(certificateTypeId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteCertificateType = async () => {
    setIsDeleteModalVisible(false)
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

  const editCertificateTypeButtonHandler = (id: number): void => {
    setIsEditCertificateType(true)
    setCertificateId(id)
    setEditCertificateTypeDetails({
      id: 0,
      technologyId: 0,
      technologyName: '',
      certificateType: '',
      technology: '',
    })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'certificate') {
      setEditCertificateTypeDetails((prevState) => {
        return { ...prevState, ...{ [name]: name } }
      })
    }
  }

  useEffect(() => {
    if (isEditCertificateType) {
      dispatch(reduxServices.certificateType.getCertificateType(certificateId))
    }
  }, [certificateId, dispatch, isEditCertificateType])

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
                    <CTableHeaderCell scope="row">
                      {getItemNumber(index)}
                    </CTableHeaderCell>
                    {isEditCertificateType &&
                    certificateTypeItem.id === certificateId ? (
                      <CTableDataCell scope="row">
                        <CFormSelect
                          data-testid="form-select"
                          aria-label="Default select example"
                          size="sm"
                          name="technology"
                          value={editCertificateTypeDetails.technologyName}
                        >
                          <option value={''}>Select Category</option>
                          {getAllTechnology?.map((certificateItem, index) => (
                            <option key={index} value={certificateItem.name}>
                              {certificateItem.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>
                        {certificateTypeItem.technologyName}
                      </CTableDataCell>
                    )}
                    {isEditCertificateType &&
                    certificateTypeItem.id === certificateId ? (
                      <CTableDataCell scope="row">
                        <CFormInput
                          type="text"
                          id="Name"
                          size="sm"
                          name="certificate"
                          maxLength={32}
                          value={editCertificateTypeDetails?.certificateType}
                          onChange={handleInputChange}
                        ></CFormInput>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>
                        {certificateTypeItem.certificateType}
                      </CTableDataCell>
                    )}
                    <CTableDataCell scope="row">
                      {isEditCertificateType &&
                      certificateTypeItem.id === certificateId ? (
                        <>
                          <CButton
                            color="success"
                            data-testid={`sh-save-btn${index}`}
                            className="btn-ovh me-1"
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                          <CButton color="warning" className="btn-ovh me-1">
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </>
                      ) : (
                        <>
                          <CButton
                            color="info"
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
                            color="danger"
                            size="sm"
                            onClick={() =>
                              handleShowDeleteModal(
                                certificateTypeItem.id as number,
                              )
                            }
                          >
                            <CIcon className="text-white" icon={cilTrash} />
                          </CButton>
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
              <p>
                <strong>Total Records:{certificateTypes.length}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {certificateTypes.length > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
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
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteCertificateType}
      >
        {`Do you really want to delete this certificateType ?`}
      </OModal>
    </>
  )
}
export default CertificateTypeTable
