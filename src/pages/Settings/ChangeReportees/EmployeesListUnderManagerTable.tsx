import React from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import ReporteesUpdateAutoComplete from './ReporteesUpdateAutoComplete'
import { EmployeeData } from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeesListUnderManagerTable = ({
  employeeData,
  managersOrHrManagersList,
  placeHolder,
}: {
  employeeData: EmployeeData[]
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
}): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.changeReportees.selectors.isLoading,
  )
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CTable className="mt-4" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeeData?.map((employee) => {
                return (
                  <CTableRow key={employee.id}>
                    <CTableDataCell>
                      <CFormCheck id="flexCheckDefault" label="" />
                    </CTableDataCell>
                    <CTableDataCell>{employee.id}</CTableDataCell>
                    <CTableDataCell>{employee.fullName}</CTableDataCell>
                    <CTableDataCell>{employee.departmentName}</CTableDataCell>
                    <CTableDataCell>{employee.designation}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
            <CCol xs={4}></CCol>
          </CTable>

          <CCol xs={4}>
            <strong>
              {employeeData.length > 0
                ? `Total Records: ${employeeData.length}`
                : `No Records Found`}
            </strong>
          </CCol>
          {employeeData.length > 0 && (
            <CCol>
              <ReporteesUpdateAutoComplete
                managersOrHrManagersList={managersOrHrManagersList}
                placeHolder={placeHolder}
              />
              <CRow className="mb-3 align-items-center ms-5">
                <CCol sm={{ span: 6, offset: 3 }}>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    data-testid="update-manager"
                    // disabled={!isViewBtnEnabled}
                    // onClick={handleEditEmployee}
                  >
                    Update
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          )}
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default EmployeesListUnderManagerTable
