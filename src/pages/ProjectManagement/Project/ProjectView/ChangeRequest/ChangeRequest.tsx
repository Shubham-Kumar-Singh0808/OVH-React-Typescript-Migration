import React, { useState } from 'react'
import ChangeRequestTable from './ChangeRequestTable'
import AddEditChangeRequest from './AddChangeRequest'
import EditChangeRequest from './EditChangeRequest'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
import { ChangeRequest } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'

const ProjectChangeRequest = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [editChangeRequest, setEditChangeRequest] = useState(
    {} as ChangeRequest,
  )
  const [editDescription, setEditDescription] = useState<string>()

  return (
    <>
      {toggle === '' && (
        <>
          <OAddButton addButtonHandler={() => setToggle('addChangeRequest')} />
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
