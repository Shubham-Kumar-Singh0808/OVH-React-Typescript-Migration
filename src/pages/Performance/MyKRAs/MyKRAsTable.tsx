import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import MyKRAsEntry from './MyKRAsEntry'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const MyKRAsTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedPersonId, setSelectedPersonId] = useState<number>(
    Number(employeeId),
  )

  const individualKRAs = useTypedSelector(reduxServices.myKRAs.selectors.kras)

  return (
    <>
      <CTable
        responsive
        striped
        className="mt-3 align-middle table-layout-fixed"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell>KRA Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Percentage</CTableHeaderCell>
            <CTableHeaderCell>No.of KPIs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {individualKRAs &&
            individualKRAs?.map((kra, index) => (
              <MyKRAsEntry
                id={kra.id}
                key={index}
                selectedPersonId={Number(selectedPersonId)}
                setSelectedPersonId={setSelectedPersonId}
                isIconVisible={isIconVisible}
                setIsIconVisible={setIsIconVisible}
                employeeKRA={{
                  checkType: kra.checkType,
                  count: kra.count,
                  departmentId: kra.departmentId,
                  departmentName: kra.departmentName,
                  description: kra.description,
                  designationId: kra.designationId,
                  designationKraPercentage: kra.designationKraPercentage,
                  designationName: kra.designationName,
                  id: kra.id,
                  kpiLookps: kra.kpiLookps,
                  name: kra.name,
                }}
              />
            ))}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {individualKRAs.length}</strong>
          </p>
        </CCol>
      </CRow>
    </>
  )
}

export default MyKRAsTable
