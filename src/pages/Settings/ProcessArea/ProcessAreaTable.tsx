import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ProcessAreaTable = (): JSX.Element => {
  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )
  const ProcessSubHeads = useTypedSelector(
    reduxServices.processArea.selectors.ProcessSubHeads,
  )
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Process Area</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document</CTableHeaderCell>
            <CTableHeaderCell scope="col">Responsible</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document Link</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status </CTableHeaderCell>
            <CTableHeaderCell scope="col">Order </CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {ProjectTailoringList.length > 0 &&
            ProjectTailoringList?.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index}</CTableDataCell>
                  {ProcessSubHeads.length > 0 &&
                    ProcessSubHeads?.map((count) => {
                      return (
                        <>
                          <CTableDataCell>
                            {count.processSubHeadName}
                          </CTableDataCell>
                          <CTableDataCell>{count?.documentName}</CTableDataCell>
                          <CTableDataCell>{count?.responsible}</CTableDataCell>
                          <CTableDataCell>{count?.link}</CTableDataCell>
                          <CTableDataCell>
                            {count.status === 'true' ? 'Active' : 'Inactive'}
                          </CTableDataCell>
                          <CTableDataCell>{count?.order}</CTableDataCell>
                        </>
                      )
                    })}
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default ProcessAreaTable
