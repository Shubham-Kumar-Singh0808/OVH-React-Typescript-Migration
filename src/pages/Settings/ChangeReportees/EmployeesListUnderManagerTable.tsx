import React, { useEffect, useState } from 'react'
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
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeesListUnderManagerTable = ({
  employeeData,
  managersOrHrManagersList,
  placeHolder,
  onClickHandler,
  autoCompleteTarget,
}: {
  employeeData: EmployeeData[]
  managersOrHrManagersList: EmployeeData[]
  placeHolder: string
  autoCompleteTarget: string
  onClickHandler: () => void
}): JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [managerId, setManagerId] = useState<number>(0)
  const [validName, setValidName] = useState<boolean>(false)
  const [buttonDisable, setButtonDisable] = useState<boolean>(false)

  useEffect(() => {
    if (selectedRows.length > 0 && validName) {
      setButtonDisable(true)
    } else {
      setButtonDisable(false)
    }
  }, [selectedRows, validName])

  const dispatch = useAppDispatch()

  const actionMapping = {
    reportingManager: 'Reporting Manager',
    hrManager: 'Hr Associate',
  }
  const successToastMessage = (action: string) => (
    <OToast
      toastMessage={`Employee's ${action} changed successfully.`}
      toastColor="success"
    />
  )
  const records =
    employeeData?.length > 0
      ? `Total Records: ${employeeData.length}`
      : `No Records Found`
  //logic for selecting/unselecting the records
  const handleSelectRow = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId: number) => rowId !== id))
    }
  }
  //updating the multiple employee's manager
  const handleUpdateSelected = async () => {
    const object = {
      employeeId: selectedRows,
      managerId,
    }

    if (placeHolder === 'Manager Name') {
      const updateReporteeOrHrManager = await dispatch(
        reduxServices.changeReportees.updateReportingManagerAsync(object),
      )
      if (
        reduxServices.changeReportees.updateReportingManagerAsync.fulfilled.match(
          updateReporteeOrHrManager,
        )
      ) {
        setSelectedRows([])
        onClickHandler()
        dispatch(
          reduxServices.app.actions.addToast(
            successToastMessage(actionMapping.reportingManager),
          ),
        )

        window.scrollTo(0, 0)
      }
    } else if (placeHolder === 'Hr Name') {
      const updateReporteeOrHrManager = await dispatch(
        reduxServices.changeReportees.updateHrAssociatesManagerAsync(object),
      )

      if (
        reduxServices.changeReportees.updateHrAssociatesManagerAsync.fulfilled.match(
          updateReporteeOrHrManager,
        )
      ) {
        setSelectedRows([])
        onClickHandler()
        dispatch(
          reduxServices.app.actions.addToast(
            successToastMessage(actionMapping.hrManager),
          ),
        )
        window.scrollTo(0, 0)
      }
    }
  }

  return (
    <>
      <CTable className="mt-4" striped data-testid="tableTest">
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
                  <CFormCheck
                    id="selectEmployee"
                    onChange={(event) => handleSelectRow(event, employee.id)}
                  />
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
        <strong>{records}</strong>
      </CCol>
      {employeeData?.length > 0 && (
        <CCol>
          <ReporteesUpdateAutoComplete
            managersOrHrManagersList={managersOrHrManagersList}
            placeHolder={placeHolder}
            setManagerId={setManagerId}
            setValidName={setValidName}
            autoCompleteTarget={autoCompleteTarget}
          />
          <CRow className="mb-3 align-items-center ms-5">
            <CCol sm={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh me-1"
                color="success"
                data-testid="update-manager"
                disabled={!buttonDisable}
                onClick={() => {
                  handleUpdateSelected()
                }}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default EmployeesListUnderManagerTable
