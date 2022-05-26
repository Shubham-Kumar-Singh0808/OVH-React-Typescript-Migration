import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import {
  certificationSelectors,
  certificationThunk,
} from '../../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import { EmployeeCertificationTableProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { appActions } from '../../../../reducers/appSlice'

const EmployeeCertificationsTable = ({
  editCertificateButtonHandler,
}: EmployeeCertificationTableProps): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteCertificateById, setToDeleteCertificateById] = useState(0)
  const employeeCertificateData = useTypedSelector(
    certificationSelectors.selectCertificates,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(certificationThunk.getEmployeeCertificates())
  }, [dispatch])

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Certificate deleted successfully"
    />
  )
  const handleShowDeleteModal = (certificationId: number) => {
    setToDeleteCertificateById(certificationId)
    setIsDeleteModalVisible(true)
  }
  const handleConfirmDeleteCertificate = async () => {
    setIsDeleteModalVisible(false)
    const deleteCertificateResultAction = await dispatch(
      certificationThunk.deleteEmployeeCertificate(toDeleteCertificateById),
    )
    if (
      certificationThunk.deleteEmployeeCertificate.fulfilled.match(
        deleteCertificateResultAction,
      )
    ) {
      dispatch(certificationThunk.getEmployeeCertificates())
      dispatch(appActions.addToast(toastElement))
    }
  }

  const sortedCertificateDetails = useMemo(() => {
    if (employeeCertificateData) {
      return employeeCertificateData
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
  }, [employeeCertificateData])

  const tableDataCellProps = {
    className: 'fw-bold',
  }
  return (
    <>
      <CTable striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Technology
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Type of Certificate
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Certification
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Registration No
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Completed Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Expiry Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Percentage
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Description
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" {...tableDataCellProps}>
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedCertificateDetails?.map((certificateItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.technology}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.certificateType}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.name}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.code}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.completedDate}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.expiryDate
                  ? certificateItem.expiryDate
                  : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.percent ? certificateItem.percent : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.description
                  ? certificateItem.description
                  : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  onClick={() =>
                    editCertificateButtonHandler(certificateItem.id as number)
                  }
                >
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </CButton>
                <CButton
                  color="danger"
                  className="btn-ovh me-1"
                  onClick={() =>
                    handleShowDeleteModal(certificateItem.id as number)
                  }
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {employeeCertificateData?.length
          ? `Total Records: ${employeeCertificateData.length}`
          : `No Records Found`}
      </strong>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteCertificate}
      >
        {`Do you really want to delete this ?`}
      </OModal>
    </>
  )
}

export default EmployeeCertificationsTable
