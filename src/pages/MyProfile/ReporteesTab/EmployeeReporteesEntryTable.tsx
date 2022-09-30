import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const EmployeeReporteesEntryTable = (): JSX.Element => {
  const [selectedKRA, setSelectedKRA] = useState(0)
  const [isIconVisible, setIsIconVisible] = useState(false)
  const employeeReporteesKRAs = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReporteesKRAs,
  )

  const employeeReporteesKRIs = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReporteesKPIs,
  )

  const dispatch = useAppDispatch()

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedKRA(id as number)
    dispatch(
      reduxServices.employeeReportees.getEmployeeReporteesKPIs(id as number),
    )
    setIsIconVisible(true)
  }

  return (
    <>
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
                          data-testid="plus-icon"
                          onClick={() => handleExpandRow(KRAs.id)}
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
                              {employeeReporteesKRIs?.map((kpi, KRAindex) => {
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
                                      <Link className="employee-name" to={'#'}>
                                        {parse(kpi.description || 'N/A')}
                                      </Link>
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              })}
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
    </>
  )
}

export default EmployeeReporteesEntryTable
