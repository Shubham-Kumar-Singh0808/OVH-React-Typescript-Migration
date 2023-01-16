import React, { useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ChangeRequestTable from './ChangeRequestTable'
import AddEditChangeRequest from './AddChangeRequest'
import EditChangeRequest from './EditChangeRequest'
import { ChangeRequest } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProjectChangeRequest = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [editChangeRequest, setEditChangeRequest] = useState(
    {} as ChangeRequest,
  )
  const [editDescription, setEditDescription] = useState<string>()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessChangeRequest = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-CR',
  )

  return (
    <>
      {toggle === '' && (
        <>
          {userAccessChangeRequest?.createaccess && (
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <CButton
                  color="info btn-ovh me-1"
                  onClick={() => setToggle('addChangeRequest')}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </CCol>
            </CRow>
          )}
          <ChangeRequestTable
            setEditChangeRequest={setEditChangeRequest}
            setEditDescription={setEditDescription}
            setToggle={setToggle}
          />
        </>
      )}
      {toggle === 'addChangeRequest' && (
        <AddEditChangeRequest setToggle={setToggle} />
      )}
      {toggle === 'editChangeRequest' && (
        <EditChangeRequest
          setToggle={setToggle}
          editChangeRequest={editChangeRequest}
          setEditChangeRequest={setEditChangeRequest}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
        />
      )}
    </>
  )
}

export default ProjectChangeRequest
