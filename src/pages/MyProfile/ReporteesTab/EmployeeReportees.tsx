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
import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeReportees = (): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
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

  const pageFromState = useTypedSelector(
    reduxServices.employeeAssets.selectors.pageFromState,
  )

  const pageSizeFromState = useTypedSelector(
    reduxServices.employeeAssets.selectors.pageSizeFromState,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.employeeReportees.getEmployeeReportees(
        isViewingAnotherEmployee ? selectedEmployeeId : empID,
      ),
    )
    dispatch(reduxServices.category.actions.setCurrentPage(1))
    dispatch(reduxServices.category.actions.setPageSize(20))
  }, [dispatch, empID, isViewingAnotherEmployee, selectedEmployeeId])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeReportees.length, pageFromState, pageSizeFromState)

  useEffect(() => {
    setPageSize(20)
    setCurrentPage(1)
  }, [employeeReportees, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeReportees, currentPage, pageSize),
    [employeeReportees, currentPage, pageSize],
  )

  const handleModal = (personId: number) => {
    setIsModalVisible(true)
    dispatch(reduxServices.employeeReportees.getEmployeeReporteesKRAs(personId))
  }

  useEffect(() => {
    dispatch(reduxServices.employeeAssets.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.employeeAssets.actions.setPageSize(pageSize))
  }, [dispatch])

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
    setIsIconVisible(true)
  }

  const handleExportReporteesData = async () => {
    const employeeListDownload =
      await employeeReporteesApi.exportEmployeeReporteesData()

    downloadFile(employeeListDownload)
  }

  const downloadFile = (cvDownload: Blob | undefined) => {
    if (cvDownload) {
      const url = window.URL.createObjectURL(
        new Blob([cvDownload], {
          type: cvDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'ReporteesList.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1"
            className="text-white"
            size="sm"
            onClick={handleExportReporteesData}
          >
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CCardHeader>
        <h4 className="h4">Manager Reportees</h4>
      </CCardHeader>
      <br />
      <CCardBody className="ps-0 pe-0">
        {employeeReportees.length ? (
          <>
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
                {currentPageItems.length > 0 &&
                  currentPageItems?.map((reportee, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">
                        {' '}
                        {getItemNumber(index)}
                      </CTableDataCell>
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
            <br />
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {employeeReportees.length}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {employeeReportees.length > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                    selectedPageSize={pageSize}
                  />
                )}
              </CCol>
              {employeeReportees.length > 20 && (
                <CCol
                  xs={5}
                  className="d-grid gap-2 d-md-flex justify-content-md-end"
                >
                  <OPagination
                    currentPage={currentPage}
                    pageSetter={setCurrentPage}
                    paginationRange={paginationRange}
                  />
                </CCol>
              )}
            </CRow>
          </>
        ) : (
          <>
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
            </CTable>
            <br />
            <CCol xs={4}>
              <p>
                <strong>No Records Found... </strong>
              </p>
            </CCol>
          </>
        )}
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
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employeeReporteesKRAs?.map((KRAs, index) => {
                  return (
                    <>
                      <CTableRow key={index}>
                        <CTableDataCell className="text-center">
                          {isIconVisible && selectedKRA === KRAs.id ? (
                            <i
                              className="fa fa-minus-circle cursor-pointer"
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
                          <CTableRow>
                            <CTableDataCell colSpan={8}>
                              <CTable responsive striped>
                                <CTableHead color="info">
                                  <CTableRow>
                                    <CTableHeaderCell scope="col">
                                      #
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                      KPI Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                      Description
                                    </CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {employeeReporteesKRIs?.map(
                                    (kpi, KRAindex) => {
                                      return (
                                        <CTableRow key={KRAindex} col-span={7}>
                                          <CTableDataCell>
                                            {KRAindex + 1}
                                          </CTableDataCell>
                                          <CTableDataCell>
                                            <CLink className="text-decoration-none">
                                              {kpi.name}
                                            </CLink>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                            <Link
                                              className="employee-name"
                                              to={'#'}
                                            >
                                              {parse(kpi.description || 'N/A')}
                                            </Link>
                                          </CTableDataCell>
                                        </CTableRow>
                                      )
                                    },
                                  )}
                                </CTableBody>
                              </CTable>
                            </CTableDataCell>
                          </CTableRow>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )
                })}
              </CTableBody>
            </CTable>
            <strong>
              {employeeReporteesKRAs?.length
                ? `Total Records: ${employeeReporteesKRAs?.length}`
                : `No Records found`}
            </strong>
          </>
        </OModal>
      </CCardBody>
    </>
  )
}
export default EmployeeReportees
