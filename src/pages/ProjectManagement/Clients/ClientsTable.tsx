import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useState } from 'react'

const ClientsTable = () => {
  const [projectDetailsClicked, setProjectDetailsClicked] = useState<
    boolean | undefined
  >(false)

  const icon = projectDetailsClicked
    ? 'fa fa-minus-circle cursor-pointer'
    : 'fa fa-plus-circle cursor-pointer'

  const onShowProjectDetailsHandler = () => {
    setProjectDetailsClicked((projectDetailsClicked) => !projectDetailsClicked)
  }
  return (
    <>
      <CTable className="text-left" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Organization</CTableHeaderCell>
            <CTableHeaderCell scope="col">Client</CTableHeaderCell>
            <CTableHeaderCell scope="col">Contact Person</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">F.P</CTableHeaderCell>
            <CTableHeaderCell scope="col">R.P</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          <CTableRow>
            <CTableDataCell scope="row">
              <i className={icon} onClick={onShowProjectDetailsHandler} />
            </CTableDataCell>
            <CTableDataCell scope="row">s</CTableDataCell>
            <CTableDataCell scope="row">fn</CTableDataCell>
            <CTableDataCell scope="row">n</CTableDataCell>
            <CTableDataCell scope="row">df</CTableDataCell>
            <CTableDataCell scope="row">r</CTableDataCell>
            <CTableDataCell scope="row">fg</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ClientsTable
