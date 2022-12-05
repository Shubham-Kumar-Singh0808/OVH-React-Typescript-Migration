import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const EmployeeProfileFamilyTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const getEmployeeFamilyData = useTypedSelector(
    reduxServices.personalInformation.selectors.familyDetails,
  )

  const { employeeProfileId } = useParams<{ employeeProfileId: string }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.personalInformation.getEmployeeFamilyDetails(
        employeeProfileId,
      ),
    )
  }, [dispatch, employeeProfileId])

  const sortedFamilyDetails = useMemo(() => {
    if (getEmployeeFamilyData) {
      return getEmployeeFamilyData
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.personName.localeCompare(sortNode2.personName),
        )
    }
    return []
  }, [getEmployeeFamilyData])

  return (
    <>
      <CTable
        responsive
        // striped={striped}
        // bordered={bordered}
        // className={tableClassName}
        // align="middle"
      >
        <>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Relationship</CTableHeaderCell>
              <CTableHeaderCell scope="col">Contact Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date Of Birth</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        </>
        <CTableBody>
          {sortedFamilyDetails.length > 0 &&
            sortedFamilyDetails?.map((family, index) => (
              <CTableRow key={index}>
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
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </>
  )
}
export default EmployeeProfileFamilyTable
