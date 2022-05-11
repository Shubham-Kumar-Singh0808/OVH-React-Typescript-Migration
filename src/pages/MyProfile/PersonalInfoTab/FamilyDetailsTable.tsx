import React, { useEffect } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { doFetchFamilyDetails } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { FamilyInfo } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
const FamilyDetailsTable: React.FC<FamilyInfo> = ({
  isFieldDisabled = false,
  striped = true,
  bordered = true,
  tableClassName = '',
}: FamilyInfo): JSX.Element => {
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const familyDetails = useTypedSelector(
    (state) => state.familyDetails.getFamilyDetails,
  )
  console.log(familyDetails)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchFamilyDetails(employeeId))
  }, [dispatch, employeeId])
  const tableHeaderCellProps = {
    width: '25%',
    scope: 'col',
  }
  const tableDataCellProps = {
    colSpan: 4,
    className: 'fw-semibold',
  }
  const sortedFamilyDetails = familyDetails?.sort((sortNode1, sortNode2) =>
    sortNode1.personName.localeCompare(sortNode2.personName),
  )
  console.log(sortedFamilyDetails)
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
                  <CButton color="info" className="btn-ovh me-2">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton color="danger" className="btn-ovh me-2">
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
            {familyDetails?.length
              ? `Total Records: ${familyDetails?.length}`
              : `No Records found`}
          </strong>
        </>
      )}
    </>
  )
}
export default FamilyDetailsTable
