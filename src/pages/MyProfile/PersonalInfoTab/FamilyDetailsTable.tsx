import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { doFetchFamilyDetails } from '../../../reducers/MyProfile/Categories/PersonalInfoTabSlice'

import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
const FamilyDetailsTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )

  const getFamilyDetails = useTypedSelector(
    (state) => state.familyDetails.roles,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchFamilyDetails(employeeId))
  }, [dispatch, employeeId])
  console.log(getFamilyDetails)
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
          {getFamilyDetails.length > 0 &&
            getFamilyDetails.map((family, index) => (
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
                  <CButton color="info" className="btn-ovh me-2">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton color="danger" className="btn-ovh me-2">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <strong>
        {getFamilyDetails.length
          ? `Total Records: ${getFamilyDetails.length}`
          : `No Records found`}
      </strong>
    </>
  )
}
export default FamilyDetailsTable
