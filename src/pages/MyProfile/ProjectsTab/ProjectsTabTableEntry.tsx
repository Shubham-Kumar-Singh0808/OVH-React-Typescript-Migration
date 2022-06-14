import {
  CBadge,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'

const ProjectsTabTableEntry = (props: any): JSX.Element => {
  return (
    <>
      <CTableRow key={props.index}>
        <CTableDataCell scope="row">1</CTableDataCell>
        <CTableDataCell scope="row">2</CTableDataCell>
        <CTableDataCell scope="row">3</CTableDataCell>
        <CTableDataCell scope="row">4</CTableDataCell>
        <CTableDataCell scope="row">5</CTableDataCell>
        <CTableDataCell scope="row">6</CTableDataCell>
        <CTableDataCell scope="row">7</CTableDataCell>
        <CTableDataCell scope="row">8</CTableDataCell>
      </CTableRow>
    </>
  )
}

export default ProjectsTabTableEntry
