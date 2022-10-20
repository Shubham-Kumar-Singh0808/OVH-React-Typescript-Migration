import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import TableActions from './TableActions'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { EmployeeCertificationTableProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'
import { localeDateFormat } from '../../../../utils/dateFormatUtils'
import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EmployeeCertificationsTable = ({
  editCertificateButtonHandler,
}: EmployeeCertificationTableProps): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [certificateId, setCertificateId] = useState(0)

  const employeeCertificates = useTypedSelector((state) =>
    reduxServices.employeeCertifications.selectors.employeeCertificates(
      state,
      isViewingAnotherEmployee,
    ),
  )
  const dispatch = useAppDispatch()
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToCertifications = userAccessToFeatures?.find(
    (feature) => feature.name === 'My Profile-Skills-Certifications',
  )
  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
    if (isViewingAnotherEmployee) {
      dispatch(
        reduxServices.employeeCertifications.getEmployeeCertificateById(
          selectedEmployeeId,
        ),
      )
    } else {
      dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
    }
  }, [dispatch, isViewingAnotherEmployee, selectedEmployeeId])

  const sortedCertificateDetails = useMemo(() => {
    if (employeeCertificates) {
      return employeeCertificates
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    } else return []
  }, [employeeCertificates])

  const tableDataCellProps = {
    colSpan: 9,
    className: 'fw-semibold',
  }

  return (
    <>
      <CTable
        responsive
        striped={isViewingAnotherEmployee}
        bordered={isViewingAnotherEmployee}
      >
        {!isViewingAnotherEmployee ? (
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Type of Certificate
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Certification</CTableHeaderCell>
              <CTableHeaderCell scope="col">Registration No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        ) : (
          <CTableHead color="primary">
            <CTableRow>
              <CTableDataCell {...tableDataCellProps}>
                Certifications
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Technology</CTableHeaderCell>
              <CTableHeaderCell>Type of Certificate</CTableHeaderCell>
              <CTableHeaderCell>Certification</CTableHeaderCell>
              <CTableHeaderCell>Registration No</CTableHeaderCell>
              <CTableHeaderCell>Completed Date</CTableHeaderCell>
              <CTableHeaderCell>Expiry Date</CTableHeaderCell>
              <CTableHeaderCell>Percentage</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        )}
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
              <TableActions
                certificateItemId={certificateItem.id}
                isViewingAnotherEmployee={isViewingAnotherEmployee}
                editCertificateButtonHandler={editCertificateButtonHandler}
                certificateId={certificateId}
                setCertificateId={setCertificateId}
                isDeleteModalVisible={isDeleteModalVisible}
                setIsDeleteModalVisible={setIsDeleteModalVisible}
                userAccess={userAccessToCertifications as UserAccessToFeatures}
              />
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {employeeCertificates?.length
          ? `Total Records: ${employeeCertificates.length}`
          : `No Records Found`}
      </strong>
    </>
  )
}

export default EmployeeCertificationsTable
