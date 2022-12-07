import { CForm } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ProjectRequestViewDetails = (): JSX.Element => {
  const projectViewDetails = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.getProjectRequests,
  )
  return <CForm></CForm>
}

export default ProjectRequestViewDetails
