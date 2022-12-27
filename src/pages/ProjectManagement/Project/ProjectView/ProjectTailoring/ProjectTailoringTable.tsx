import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ProjectTailoringExpendableTable from './ProjectTailoringExpendableTable'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectTailoringTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [milestoneId, setMilestoneId] = useState<number>()
  const projectTailoring = useTypedSelector(
    reduxServices.projectTailoring.selectors.projectTailoring,
  )

  const handleExpandRow = (id: number) => {
    setIsIconVisible(true)
    setMilestoneId(id)
  }
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Process Areas</CTableHeaderCell>
            <CTableHeaderCell scope="col">Documents</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              No. of Documents Tailored
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              No. of Documents Waived off
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {projectTailoring?.processHeaddto.length > 0 &&
            projectTailoring?.processHeaddto.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row">
                      {isIconVisible && milestoneId === data.id ? (
                        <i
                          data-testid="minus-btn"
                          className="fa fa-minus-circle cursor-pointer"
                          onClick={() => setIsIconVisible(false)}
                        />
                      ) : (
                        <i
                          data-testid="plus-btn"
                          className="fa fa-plus-circle cursor-pointer"
                          onClick={() => handleExpandRow(data.processHeadId)}
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.processHeadname}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.processSubHeadCount}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.tailoredCount}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.waivedCount}
                    </CTableDataCell>
                  </CTableRow>
                  {isIconVisible && milestoneId === data.id ? (
                    <CTableDataCell colSpan={10}>
                      <ProjectTailoringExpendableTable />
                    </CTableDataCell>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectTailoringTable
