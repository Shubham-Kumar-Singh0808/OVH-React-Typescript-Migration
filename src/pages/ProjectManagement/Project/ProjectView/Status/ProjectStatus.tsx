import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ProjectStatusTable from './ProjectStatusTable'
import AddProjectStatus from './AddProjectStatus'
import EditProjectStatus from './EditProjectStatus'
import { usePagination } from '../../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector, useAppDispatch } from '../../../../../stateStore'

const ProjectStatus = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [editCurrentWeekDate, setEditCurrentWeekDate] = useState<
    string | Date
  >()
  const [editNextWeekDate, setEditNextWeekDate] = useState<string | Date>()
  const [editCurrentWeekStatus, setEditCurrentWeekStatus] = useState<string>()
  const [editNextWeekStatus, setEditNextWeekStatus] = useState<string>()
  const [statusId, setStatusId] = useState<number>()
  const listSize = useTypedSelector(
    reduxServices.tickets.selectors.allTicketsListSize,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddProjectStatus = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-Status',
  )
  const { projectId } = useParams<{ projectId: string }>()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.projectStatus.getStatusReportList({
        endIndex: pageSize * currentPage,
        firstIndex: pageSize * (currentPage - 1),
        projectId,
      }),
    )
  }, [dispatch, pageSize, currentPage])
  return (
    <>
      {toggle === '' && (
        <>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              {userAccessToAddProjectStatus?.createaccess && (
                <CButton
                  color="info btn-ovh me-1"
                  data-testid="add-btn"
                  onClick={() => setToggle('addProjectStatus')}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              )}
            </CCol>
          </CRow>
          <ProjectStatusTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            setToggle={setToggle}
            setEditCurrentWeekDate={setEditCurrentWeekDate}
            setEditNextWeekDate={setEditNextWeekDate}
            setEditNextWeekStatus={setEditNextWeekStatus}
            setEditCurrentWeekStatus={setEditCurrentWeekStatus}
            setStatusId={setStatusId}
          />
        </>
      )}
      {toggle === 'addProjectStatus' && (
        <AddProjectStatus setToggle={setToggle} />
      )}
      {toggle === 'editProjectStatus' && (
        <EditProjectStatus
          setToggle={setToggle}
          editCurrentWeekDate={editCurrentWeekDate}
          editNextWeekDate={editNextWeekDate}
          editCurrentWeekStatus={editCurrentWeekStatus}
          editNextWeekStatus={editNextWeekStatus}
          setEditCurrentWeekDate={setEditCurrentWeekDate}
          setEditNextWeekDate={setEditNextWeekDate}
          setEditNextWeekStatus={setEditNextWeekStatus}
          setEditCurrentWeekStatus={setEditCurrentWeekStatus}
          statusId={statusId}
        />
      )}
    </>
  )
}

export default ProjectStatus
