import { CButton, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import { TableActionsType } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

const TableActions = ({
  certificateItemId,
  isViewingAnotherEmployee,
  editCertificateButtonHandler,
  setCertificateId,
  setIsDeleteModalVisible,
}: TableActionsType) => {
  const handleShowDeleteModal = (certificationId: number) => {
    setCertificateId(certificationId)
    setIsDeleteModalVisible(true)
  }

  return (
    <>
      {!isViewingAnotherEmployee ? (
        <CTableDataCell scope="row">
          <CButton
            data-testid="edotCertBtn"
            color="info"
            className="btn-ovh me-1"
            onClick={() =>
              editCertificateButtonHandler(certificateItemId as number)
            }
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </CButton>
          <CButton
            data-testid="showAlertBtn"
            color="danger"
            className="btn-ovh me-1"
            onClick={() => handleShowDeleteModal(certificateItemId as number)}
          >
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </CButton>
        </CTableDataCell>
      ) : (
        <></>
      )}
    </>
  )
}

export default TableActions
