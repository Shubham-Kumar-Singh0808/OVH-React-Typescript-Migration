import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { doFetchVisaDetails } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
const VisaDetailsTable = (): JSX.Element => {
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
                  <CButton color="info btn-ovh me-2">
                    <i className="fa fa-pencil-square-o"></i>
                  </CButton>
                  <CButton color="danger btn-ovh me-2">
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
    </>
  )
}
export default VisaDetailsTable
