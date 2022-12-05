import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { localeDateFormat } from '../../../../utils/dateFormatUtils'

const EmployeeProfileCertificateTable = (): JSX.Element => {
  const employeeCertificates = useTypedSelector((state) =>
    reduxServices.employeeCertifications.selectors.employeeCertificates(state),
  )
  const dispatch = useAppDispatch()
  const { employeeProfileId } = useParams<{ employeeProfileId: string }>()
  useEffect(() => {
    dispatch(
      reduxServices.employeeCertifications.getEmployeeCertificateById(
        employeeProfileId,
      ),
    )
  }, [dispatch, employeeProfileId])

  const sortedCertificateDetails = useMemo(() => {
    if (employeeCertificates.length > 0) {
      return employeeCertificates
        ?.slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    } else return []
  }, [employeeCertificates])

  return (
    <>
      <CTable
      // responsive
      // striped
      // bordered={isViewingAnotherEmployee}
      // align="middle"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type of Certificate</CTableHeaderCell>
            <CTableHeaderCell scope="col">Certification</CTableHeaderCell>
            <CTableHeaderCell scope="col">Registration No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {sortedCertificateDetails?.map((certificateItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.technology ?? 'NA'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.certificateType ?? 'NA'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.name}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.code}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {localeDateFormat(certificateItem.completedDate as string)}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.expiryDate
                  ? localeDateFormat(certificateItem.expiryDate as string)
                  : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.percent ? certificateItem.percent : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row" className="descriptionField">
                {certificateItem.description
                  ? parse(certificateItem.description)
                  : 'N/A'}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeProfileCertificateTable
