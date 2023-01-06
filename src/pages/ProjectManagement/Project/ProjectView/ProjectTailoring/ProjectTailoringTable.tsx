import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectTailoringExpendableTable from './ProjectTailoringExpendableTable'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ProjectTailoringTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [milestoneId, setMilestoneId] = useState<number>()
  const projectTailoring = useTypedSelector(
    reduxServices.projectTailoring.selectors.projectTailoringList,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectTailoring.getProjectTailoring(projectId))
    dispatch(reduxServices.projectTailoring.getProjectTailoringDocument('view'))
  }, [])

  useEffect(() => {
    if (projectTailoring) {
      setIsIconVisible(true)
      setMilestoneId(projectTailoring[0]?.id)
    }
  }, [])

  const handleExpandRow = (id: number) => {
    dispatch(reduxServices.projectTailoring.getProjectTailoring(projectId))
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
          {projectTailoring?.length > 0 &&
            projectTailoring?.map((data, index) => {
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
                          onClick={() => handleExpandRow(data.id as number)}
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
                      {data.documentCount}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.tailoredCount || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.waivedCount || 'N/A'}
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
