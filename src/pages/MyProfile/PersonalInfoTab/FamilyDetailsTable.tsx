import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  doFetchFamilyDetails,
  doDeleteFamilyMember,
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
import { EmployeeFamilyDetailsTableProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OModal from '../../../components/ReusableComponent/OModal'
const FamilyDetailsTable = ({
  editButtonHandler,
}: EmployeeFamilyDetailsTableProps): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeletefamilyId, setToDeletefamilyId] = useState(0)
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const fetchFamilyDetails = useTypedSelector(
    (state) => state.familyDetails.getFamilyDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchFamilyDetails(employeeId))
  }, [dispatch, employeeId])
  const handleShowDeleteModal = (familyId: number) => {
    setIsDeleteModalVisible(true)
    setToDeletefamilyId(familyId)
  }
  const handleConfirmDeleteRole = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      doDeleteFamilyMember(toDeletefamilyId),
    )
    if (doDeleteFamilyMember.fulfilled.match(deleteFamilyMemberResultAction)) {
      dispatch(doFetchFamilyDetails(employeeId))
    }
  }
  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Relationship</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {fetchFamilyDetails?.length > 0 &&
            fetchFamilyDetails?.map((family, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">{family.personName}</CTableDataCell>
                <CTableDataCell scope="row">
                  {family.relationShip}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {family.contactNumber || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {family.dateOfBirth || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton
                    color="info"
                    className="btn-ovh me-2"
                    onClick={() => editButtonHandler(family.familyId)}
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="danger"
                    className="btn-ovh me-2"
                    onClick={() => handleShowDeleteModal(family.familyId)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <strong>
        {fetchFamilyDetails?.length
          ? `Total Records: ${fetchFamilyDetails?.length}`
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
export default FamilyDetailsTable
