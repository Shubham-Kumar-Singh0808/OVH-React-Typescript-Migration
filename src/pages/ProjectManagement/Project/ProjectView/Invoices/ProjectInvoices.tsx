import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectInvoicesTable from './ProjectInvoicesTable'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'

const ProjectInvoices = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectInvoices.getClosedMilestonesAndCRs(projectId))
  }, [])
  return (
    <>
      <OAddButton />
      <ProjectInvoicesTable />
    </>
  )
}

export default ProjectInvoices
