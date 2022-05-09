import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  doFetchVisaDetails,
  doDeleteVisaDetails,
} from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { EmployeeVisaDetailsTableProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OModal from '../../../components/ReusableComponent/OModal'
const VisaDetailsTable = ({
  editVisaButtonHandler,
}: EmployeeVisaDetailsTableProps): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteVisaId, setToDeleteVisaId] = useState(0)
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )

  const fetchVisaDetails = useTypedSelector(
    (state) => state.familyDetails.getVisaDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchVisaDetails(employeeId))
  }, [dispatch, employeeId])
  const handleShowDeleteModal = (visaId: number) => {
    setToDeleteVisaId(visaId)
    setIsDeleteModalVisible(true)
  }
  const handleConfirmDeleteRole = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      doDeleteVisaDetails(toDeleteVisaId),
    )
    if (doDeleteVisaDetails.fulfilled.match(deleteFamilyMemberResultAction)) {
      dispatch(doFetchVisaDetails(employeeId))
    }
  }

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Visa Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Issue</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Expire</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {fetchVisaDetails?.length > 0 &&
            fetchVisaDetails?.map((visasItem, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {visasItem.countryName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {visasItem.visaType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {visasItem.dateOfIssue}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {visasItem.dateOfExpire}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton
                    color="info btn-ovh me-2"
                    onClick={() => editVisaButtonHandler(visasItem.id)}
                  >
                    <i className="fa fa-pencil-square-o"></i>
                  </CButton>
                  <CButton
                    color="danger btn-ovh me-2"
                    onClick={() => handleShowDeleteModal(visasItem.id)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <strong>
        {fetchVisaDetails?.length
          ? `Total Records: ${fetchVisaDetails?.length}`
          : `No Records found`}
      </strong>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteRole}
      >
        {`Do you really want to delete this ?`}
      </OModal>
    </>
  )
}
export default VisaDetailsTable
