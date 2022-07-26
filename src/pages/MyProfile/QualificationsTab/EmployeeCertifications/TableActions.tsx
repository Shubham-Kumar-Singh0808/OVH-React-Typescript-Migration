import { CButton, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { TableActionsType } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

const TableActions = ({
  certificateItemId,
  isViewingAnotherEmployee,
  editCertificateButtonHandler,
  // handleShowDeleteModal,
  certificateId,
  setCertificateId,
  isDeleteModalVisible,
  setIsDeleteModalVisible,
}: TableActionsType) => {
  const dispatch = useAppDispatch()

  const handleShowDeleteModal = (certificationId: number) => {
    setCertificateId(certificationId)
    setIsDeleteModalVisible(true)
  }

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Certificate deleted successfully"
    />
  )

  const handleConfirmDeleteCertificate = async () => {
    setIsDeleteModalVisible(false)
    const deleteCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.deleteEmployeeCertificate(
        certificateId,
      ),
    )
    if (
      reduxServices.employeeCertifications.deleteEmployeeCertificate.fulfilled.match(
        deleteCertificateResultAction,
      )
    ) {
      dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
      dispatch(reduxServices.app.actions.addToast(toastElement))
    }
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

export default TableActions
