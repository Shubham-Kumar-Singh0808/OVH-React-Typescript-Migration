import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeGetEmailTemplateProps } from '../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'

const employeeEmailTemplateTable = (props: EmployeeGetEmailTemplateProps) => {
  const employeeEmailtemplate = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplate,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeEmailTemplate(props),
    )
  }, [dispatch])

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Template</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
      </CTable>
    </>
  )
}
export default employeeEmailTemplateTable
