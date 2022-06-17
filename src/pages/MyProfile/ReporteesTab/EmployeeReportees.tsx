import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CCol,
  CLink,
  CButton,
  CRow,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { Link } from 'react-router-dom'
import OModal from '../../../components/ReusableComponent/OModal'
import parse from 'html-react-parser'
const EmployeeReportees = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedKRA, setSelectedKRA] = useState(0)
  const empID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const employeeReportees = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReportees,
  )

  const employeeReporteesKRAs = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReporteesKRAs,
  )

  const employeeReporteesKRIs = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReporteesKPIs,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeReportees.getEmployeeReportees(empID))
  }, [dispatch, empID])

  const handleModal = (personId: number) => {
    setIsModalVisible(true)
    dispatch(reduxServices.employeeReportees.getEmployeeReporteesKRAs(personId))
  }

  const tableHeaderCellProps = {
    scope: 'col',
  }

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedKRA(id as number)
    dispatch(
      reduxServices.employeeReportees.getEmployeeReporteesKPIs(id as number),
    )
    setIsIconVisible(!isIconVisible)
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton color="info btn-ovh me-1" className="text-white" size="sm">
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CCardHeader>
        <h4 className="h4">Manager Reportees</h4>
      </CCardHeader>
      <CCardBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell {...tableHeaderCellProps}>
                Manager
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Reportee</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mobile No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Reportee Project Name & Allocation %
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">KRAs</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employeeReportees?.map((reportee, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.managerId}`}
                    className="employee-name"
                  >
                    {reportee.managerName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.reporteeId}`}
                    className="employee-name"
                  >
                    {reportee.reporteeName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.mobile || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.allcoationDetails || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    onClick={() => handleModal(reportee.reporteeId)}
                  >
                    Click for KRAs
                  </CLink>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CCol xs={4}>
          <strong>
            {employeeReportees?.length
              ? `Total Records: ${employeeReportees?.length}`
              : `No Records found`}
          </strong>
        </CCol>
        <OModal
          modalSize="lg"
          alignment="center"
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
        >
          <>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Designation Percentage
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
                  <CTableHeaderCell scope="col">KRAs</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employeeReporteesKRAs.map((KRAs, index) => {
                  return (
                    <>
                      <CTableRow key={index}>
                        <CTableDataCell className="text-center">
                          {isIconVisible && selectedKRA === KRAs.id ? (
                            <i
                              className="'fa fa-minus-circle cursor-pointer"
                              onClick={() => setIsIconVisible(false)}
                            />
                          ) : (
                            <i
                              className="fa fa-plus-circle cursor-pointer"
                              onClick={() => handleExpandRow(KRAs.id as number)}
                            />
                          )}
                        </CTableDataCell>

                        <CTableDataCell scope="row">{KRAs.name}</CTableDataCell>
                        <CTableDataCell scope="row">{KRAs.name}</CTableDataCell>
                        <CTableDataCell scope="row">
                          {KRAs.departmentName}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {KRAs.designationName}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {KRAs.designationKraPercentage}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {KRAs.kpiLookps || 'N/A'}
                        </CTableDataCell>
                        <CTableDataCell scope="row">
                          {KRAs.count || 'N/A'}
                        </CTableDataCell>
                      </CTableRow>
                      {isIconVisible && selectedKRA === KRAs.id ? (
                        <>
                          <CTableHead>
                            <CTableRow col-span={7}>
                              <CTableHeaderCell scope="col">#</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                KPI Name
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                Description
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {employeeReporteesKRIs.map((kpi, index) => {
                              return (
                                <CTableRow key={index} col-span={7}>
                                  <CTableDataCell>{index + 1}</CTableDataCell>
                                  <CTableDataCell>
                                    <CLink className="text-decoration-none">
                                      {kpi.name}
                                    </CLink>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CLink>
                                      {parse(kpi.description || 'N/A')}
                                    </CLink>
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })}
                          </CTableBody>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )
                })}
              </CTableBody>
            </CTable>
          </>
        </OModal>
      </CCardBody>
    </>
  )
}
export default EmployeeReportees
