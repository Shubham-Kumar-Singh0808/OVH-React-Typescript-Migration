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
  doDeleteFamilyMember,
  doFetchFamilyDetails,
  selectGetFamilyDetails,
} from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { EmployeeFamilyDetailsTableProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { appActions } from '../../../reducers/appSlice'
const FamilyDetailsTable = ({
  editButtonHandler,
  isFieldDisabled = false,
  striped = true,
  bordered = true,
  tableClassName = '',
}: EmployeeFamilyDetailsTableProps): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteFamilyId, setToDeleteFamilyId] = useState(0)
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const getFamilyDetails = useTypedSelector(selectGetFamilyDetails)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(doFetchFamilyDetails(employeeId))
  }, [dispatch, employeeId])
  const handleShowDeleteModal = (familyId: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteFamilyId(familyId)
  }

  const handleConfirmDeleteFamilyDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      doDeleteFamilyMember(toDeleteFamilyId),
    )
    if (doDeleteFamilyMember.fulfilled.match(deleteFamilyMemberResultAction)) {
      dispatch(doFetchFamilyDetails(employeeId))
      dispatch(
        appActions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Family Detail deleted successfully"
          />,
        ),
      )
    }
  }
  const tableHeaderCellProps = {
    width: '25%',
    scope: 'col',
  }
  const tableDataCellProps = {
    colSpan: 4,
    className: 'fw-semibold',
  }

  const sortedFamilyDetails = useMemo(() => {
    if (getFamilyDetails) {
      return getFamilyDetails
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.personName.localeCompare(sortNode2.personName),
        )
    }
  }, [getFamilyDetails])
  return (
    <>
      <CTable
        responsive
        striped={striped}
        bordered={bordered}
        className={tableClassName}
      >
        {!isFieldDisabled ? (
          <>
            <CTableHead color="primary">
              <CTableRow>
                <CTableDataCell {...tableDataCellProps}>
                  Family Details
                </CTableDataCell>
              </CTableRow>
              {!isFieldDisabled && (
                <CTableRow>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Person Name
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Relationship
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Contact Number
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Date of Birth
                  </CTableHeaderCell>
                </CTableRow>
              )}
            </CTableHead>
          </>
        ) : (
          <>
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
          </>
        )}
        <CTableBody>
          {sortedFamilyDetails?.map((family, index) => (
            <CTableRow key={index}>
              {isFieldDisabled ? (
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              ) : (
                <></>
              )}
              <CTableDataCell scope="row">{family.personName}</CTableDataCell>
              <CTableDataCell scope="row">{family.relationShip}</CTableDataCell>
              <CTableDataCell scope="row">
                {family.contactNumber || 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {family.dateOfBirth || 'N/A'}
              </CTableDataCell>
              {isFieldDisabled ? (
                <CTableDataCell scope="row">
                  <CButton
                    color="info"
                    className="btn-ovh me-2"
                    onClick={() => editButtonHandler?.(family.familyId)}
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
              ) : (
                <></>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {isFieldDisabled && (
        <>
          <strong>
            {getFamilyDetails?.length
              ? `Total Records: ${getFamilyDetails?.length}`
              : `No Records found`}
          </strong>
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalHeaderClass="d-none"
            confirmButtonText="Yes"
            cancelButtonText="No"
            confirmButtonAction={handleConfirmDeleteFamilyDetails}
          >
            {`Do you really want to delete this ?`}
          </OModal>
        </>
      )}
    </>
  )
}
export default FamilyDetailsTable
