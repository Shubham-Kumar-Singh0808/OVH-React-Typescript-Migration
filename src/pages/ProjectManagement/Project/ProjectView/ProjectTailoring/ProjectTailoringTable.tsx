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
// import ProjectTailoringExpendableTable from './ProjectTailoringExpendableTable'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ProjectTailoringTable = (): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(true)
  const [milestoneId, setMilestoneId] = useState<number>()
  const projectTailoringList = useTypedSelector(
    reduxServices.projectTailoring.selectors.projectTailoringList,
  )
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectTailoring.getProjectTailoring(projectId))
    dispatch(reduxServices.projectTailoring.getProjectTailoringDocument('view'))
  }, [])

  useEffect(() => {
    if (projectTailoringList) {
      setIsIconVisible(true)
      setMilestoneId(projectTailoringList[0]?.processHeadId)
    }
  }, [projectTailoringList])

  const handleExpandRow = (id: number) => {
    console.log(id)
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
          {projectTailoringList?.length > 0 &&
            projectTailoringList?.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row">
                      {isIconVisible && milestoneId === data.processHeadId ? (
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
                      {data.documentCount}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.tailoredCount || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {data.waivedCount || 'N/A'}
                    </CTableDataCell>
                  </CTableRow>
                  {isIconVisible && milestoneId === data.processHeadId ? (
                    <CTableDataCell colSpan={10}>
                      {/* <ProjectTailoringExpendableTable /> */}
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
