import {
  CRow,
  CCol,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CCardHeader,
  CCardBody,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const BankDetails = ({
  setToggle,
  setSelectBankId,
}: {
  setToggle: (value: string) => void
  setSelectBankId: (value: number) => void
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteBankId, setDeleteBankId] = useState(0)

  const dispatch = useAppDispatch()

  const bankDetail = useTypedSelector(
    reduxServices.panDetails.selectors.bankDetails,
  )

  const empId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const deletedToast = (
    <OToast
      toastColor="success"
      toastMessage=" Bank details deleted successfully."
    />
  )
  const confirmBankDetail = async () => {
    setIsDeleteModalVisible(false)
    await dispatch(reduxServices.bankDetails.deleteBankAccount(deleteBankId))
    dispatch(reduxServices.app.actions.addToast(deletedToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
    dispatch(
      reduxServices.panDetails.bankInformation({
        key: 'loggedInEmpId',
        value: Number(empId),
      }),
    )
  }

  const deleteBtnHandler = (id: number) => {
    setIsDeleteModalVisible(true)
    setDeleteBankId(id)
  }

  const editBtnHandler = (bankId: number) => {
    setSelectBankId(bankId)
    setToggle('editBankAccount')
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'My Profile-Finance-Bank Details',
  )

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Bank Details</h4>
      </CCardHeader>
      <CCardBody className="px-0">
        {userAccess?.createaccess && (
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="add-button"
                onClick={() => {
                  setToggle('addBankAccount')
                }}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
        )}
        <CTable striped responsive className="mt-4 align-middle alignment">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">A/C No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">IFSC Code</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bankDetail.bankinfo &&
              bankDetail.bankinfo?.map((name, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{name.bankAccountNumber}</CTableDataCell>
                    <CTableDataCell>{name.bankName}</CTableDataCell>
                    <CTableDataCell>{name.ifscCode}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {userAccess?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            size="sm"
                            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                            color="info btn-ovh me-1"
                            data-testid="edit-button"
                            onClick={() => editBtnHandler(name.bankId)}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccess?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            data-testid={`btn-delete${index}`}
                            size="sm"
                            color="danger btn-ovh me-1"
                            className="btn-ovh-employee-list"
                            onClick={() => deleteBtnHandler(name.bankId)}
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol xs={4}>
            <strong>
              {bankDetail?.bankinfo?.length
                ? `Total Records: ${bankDetail?.bankinfo?.length}`
                : `No Records Found...`}
            </strong>
          </CCol>
        </CRow>
        <OModal
          alignment="center"
          visible={isDeleteModalVisible}
          setVisible={setIsDeleteModalVisible}
          modalTitle="Delete Bank Detail"
          confirmButtonText="Yes"
          cancelButtonText="No"
          closeButtonClass="d-none"
          modalBodyClass="mt-0"
          confirmButtonAction={confirmBankDetail}
        >
          <>Do you really want to delete this </>
        </OModal>
      </CCardBody>
    </>
  )
}

export default BankDetails
