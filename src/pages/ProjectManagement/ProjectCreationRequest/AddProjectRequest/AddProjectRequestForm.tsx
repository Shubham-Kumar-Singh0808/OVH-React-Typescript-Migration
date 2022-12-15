import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OBackButton from '../../../../components/ReusableComponent/OBackButton'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { ClientOrganization } from '../../Project/ProjectComponent/ClientOrganization'

const AddProjectRequestForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
  }, [dispatch])

  const clientOrganizationList = projectClients
    ?.filter((filterClient: ProjectClients) => filterClient.name != null)
    .map((mapClient) => {
      return {
        id: mapClient.id,
        name: mapClient.name == null ? '' : mapClient.name,
      } as GetAutoCompleteList
    })

   return (
    <>
      <CRow className="justify-content-end">
        <OBackButton destination={''} name={''} />
        <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
          <ClientOrganization
            list={clientOrganizationList}
            onSelectHandler={handleClientSelect}
            // value={project.client}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default AddProjectRequestForm
